import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "../../../../../lib/db";
import  User from "../../../../../models/user";
import { json } from "stream/consumers";
import Email from "next-auth/providers/email";


export  async function POST(request:NextRequest){
    try {
        const {email,password} = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error:"Email and password are required"},
                {status:400}
            )
        }
        await connectionToDatabase();
        const existingUser =  await User.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {error:"Email is already exist"},
                {status:400}
            )
        }

        await User.create({
            email
            ,password
        })
        return NextResponse.json(
            {message:"user register sucessfully"},
            {status :400}
        )
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            
            {error:"failed to register"},
            {status:500}
            

        );
        
    }
}

