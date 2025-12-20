import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import { NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"

connect();

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404 }
    );
  }

  await sendEmail({
    email: user.email,
    emailType: "RESET",
    userId: user._id,
  });

  return NextResponse.json({ message: "Email sent" });
}
