import { error } from "console";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { connectionToDatabase } from "./db";
import User from "../models/user"
import bcrypt  from "bcrypt"
export const authOptions :NextAuthOptions= {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
              },
              async authorize(credentials){
                if(!credentials?.email || !credentials.password){

                    throw new Error("missing password or email"); 
                }

                try {
                    await connectionToDatabase();
                const user = await User.findOne({email:credentials.email})
                    if(!user){
                        throw new Error("No user found");
                    }

                const isValid = await bcrypt.compare(credentials.password,user.password);
                if(!isValid){
                    throw new Error("invalid password");
                }

                return{
                    id:user._id.tostring(),
                    email:user.email
                }
                } catch (error) {
                    throw Error
                }
              }
        })
    ],
    callbacks:{
        async jwt({token ,user}){
            if(user){
                token.id = user.id
            }
            return token;
        },
        async session({session,token}){
            if(session.user){
                session.user.id = token.id as string;
            }
            return session
        }
    },
    pages:{
        signIn:"/login",
        error:"/login"

    },
    session:{
        strategy:"jwt",
        maxAge:30*24*3600
    },
    secret:process.env.NEXTAUTH_SECRET
    
}