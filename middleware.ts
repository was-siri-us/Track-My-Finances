import { clerkMiddleware } from "@clerk/nextjs/server";
import { createRouteMatcher } from "@clerk/nextjs/server";
import { request } from "http";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    '/',
    // '/api(.*)'
]);

export default clerkMiddleware((auth,request) => {
    if(isProtectedRoute(request)){
        auth().protect()
    }
    return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};