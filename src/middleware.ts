import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
//middleware is used to protect the routes
//this middleware will run on every request to the server or we can specify the routes we want to protect
//we can use it to check if the user is authenticated or not
//if the user is not authenticated we can redirect them to the login page
//if the user is authenticated we can allow them to access the requested page
export async function middleware(request : NextRequest) {
    const token = await getToken({req:request})

    if(token){
        if(request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register"){
            return NextResponse.redirect(new URL('/',request.url))
        }
        else {

            return NextResponse.next();
        }
    }
    else{
        if(request.nextUrl.pathname === "/cart" || request.nextUrl.pathname === "/checkOut" || request.nextUrl.pathname === "/verifyCode" || request.nextUrl.pathname === "/resetPassword"){
            return NextResponse.redirect(new URL('/login',request.url))
        }
        else {

            return NextResponse.next();
        }
    }

}
//specify the routes we want to protect
export const config = {
    matcher: ["/cart","/login","/register","/checkOut","/verifyCode","/resetPassword"]
}