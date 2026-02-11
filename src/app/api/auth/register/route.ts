import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req:NextRequest) {
    try {
        await connectDB()
        const {name,email,password} = await req.json();

        const existingUser = await User.findOne({email})
        if(existingUser) {
            return NextResponse.json({message:"User already exists"}, {status:400})
        }

        if(password.length < 6) {
            return NextResponse.json({message:"Password must be at least 6 characters"}, {status:400})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return NextResponse.json(user,  {status:200})

    } catch (error) {
        return NextResponse.json({message:`register error ${error}`}, {status:500})
    }
}

//name,email,password frontend
//email check
//password 6 character
//password hash
//user create