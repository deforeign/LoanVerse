import {connect} from "@/dbConfig/dbConfig";
import {NextResponse} from "next/server";
import { NextRequest } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";


connect();

export async function POST(request: NextRequest) {
    try{
        const req = await request.json();
        const {token,password} = req;
        console.log("Received token:", token);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        if(!user){
            return NextResponse.json({error: 'Invalid or expired token'}, {status: 400});
        }

        console.log("User found for Password Reset:", user);
        user.password = await bcryptjs.hash(password, 10);;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({message: 'Email verified successfully'}, {status: 200});

    }
    catch(error: any){
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }

}