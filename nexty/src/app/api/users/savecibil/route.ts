import User from "@/models/userModel";
import { NextResponse ,NextRequest} from "next/server";
import {connect} from "@/dbConfig/dbConfig"

await connect();

export async function POST(request: NextRequest) {
    try {
        const { cibilScore, id } = await request.json();

        if(cibilScore>0 && cibilScore<900){
            const user = await User.findByIdAndUpdate(id, { Cibil: cibilScore }, { new: true });

            if (!user) {
                return NextResponse.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(
                { message: "CIBIL score updated successfully", user },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { message: "Invalid CIBIL score. It must be between 1 and 899." },
                { status: 400 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}