// middleware.ts
import { NextResponse } from "next/server";

export function middleware() {
  // For now, do NOT connect Supabase here. Just let the request through.
  return NextResponse.next();
}
