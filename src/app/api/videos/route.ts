import { NextRequest, NextResponse } from "next/server";
import { connectionToDatabase } from "../../../../lib/db";
import video, { Video } from "../../../../models/Video";
import { authOptions } from "../../../../lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
    try {
        await connectionToDatabase();
        const videos= await video.find({}).sort({createdAt:-1}).lean();
        if(!videos || videos.length === 0){  
            return NextResponse.json(
                {message:"No videos found"},
                {status:400}
            )

        }
        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json(
            {error:"failed to get videos"},
            {status:500}
        )      
    }
}

export async function POST(request:NextRequest){
    try {
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {error:"not authenticated"},
                {status:401}
            )

        }
        await connectionToDatabase();
        const body:Video = await request.json();
        if(!body.title || !body.description || !body.Videourl||!body.thumbnailurl){
            return NextResponse.json(
                {error:"missing required fields"},
                {status:400}
            )
        } 
        const videoData ={
            ...body,
            controls:body.controls??true,
            transformation:{
                height:1080,
                width:1920,
                quality :body.transformation?.quality??"auto",
                crop:"limit"
            }
        }
        const newVideo = await video.create(videoData);
        return  NextResponse.json(newVideo);

        
    } catch (error) {
        return NextResponse.json(
            {error:"failed to create video"},
            {status:500}
        )
        
    }

}