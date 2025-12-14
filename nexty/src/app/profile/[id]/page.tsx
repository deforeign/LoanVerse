"use client";
import { useParams,useRouter } from "next/navigation";

export default function UserProfile() {
  const params = useParams(); // { id: "123" }
  const router= useRouter();
    function logout() {
      fetch('/api/users/logout', {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Optionally redirect to login page or home page after logout
        router.push('/signup');
        
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-8">
        Hi {params.id} This is your profile page.
      </h1>
      <hr />
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
