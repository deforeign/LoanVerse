import {getTokenData} from "@/helpers/tokenData";
import {NextResponse} from "next/server";
import  {NextRequest} from "next/server";
import User from "@/models/userModel";
import {connect} from "@/dbConfig/dbConfig";

await connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenData(request);

        if (!userId) {
            return NextResponse.json(
                {message: "Unauthorized"},
                {status: 401}
            );
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                {message: "User not found"},
                {status: 404}
            );
        }

        return NextResponse.json(
            {user},
            {status: 200}
        );

    } catch (error) {
        return NextResponse.json(
            {message: "Internal Server Error"},
            {status: 500}
        );
    }
}
