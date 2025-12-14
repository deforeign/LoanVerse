import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
    const token = request.cookies.get("token")?.value;

    if (!token) {
        return null;
    }

    try {
        const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decoded.userId;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}