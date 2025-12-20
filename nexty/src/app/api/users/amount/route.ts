import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig"

await connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, amount } = reqBody;
        const user = await User.findById(id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        user.Amount = amount;
        await user.save();

        return NextResponse.json(
            { message: "Amount updated successfully" },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

