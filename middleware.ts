import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

console.log("🔥 Clerk middleware executed");   //  add this line

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};


