import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next();

    },
    {
        callbacks:{
            authorized:({token,req})=>{
                const {pathname} = req.nextUrl;

                //allow auth related routes

                if(pathname.startsWith("/api/auth")||pathname==="/login"||pathname==="/register"){
                    return true;
                }

                if(pathname==="/"||pathname==="/api/videos"){
                    return true;
                }
                return !!token
            }
        }
    }
)
export const config ={
    macher:["/((?!_next/static|_next/image|/api/auth|/login|/register|favicon.ico|public).*)"]
}