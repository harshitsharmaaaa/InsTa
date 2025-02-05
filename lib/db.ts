import mongoose from "mongoose";
import { cache } from "react";
const url = process.env.MONGODB_URI!;



if(!url){
    console.log("setup the url");
    throw new Error("MONGODB_URI is not set");
}

let cached = global.mongoose;
if(!cached){
    cached = global.mongoose = {conn: null,promise: null};
}

export async function connectionToDatabase(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const opts ={
            bufferCommands: true,
            maxpoolsize: 10,
        }
    
    cached.promise = mongoose.connect(
        url,
        opts
    ).then(()=>mongoose.connection) 
    }

    try {
        cached.conn = await cached.promise;
    } catch (Error)
    {
     
        cached.conn = null;
        throw Error;   
    }
    return cached.conn;
}