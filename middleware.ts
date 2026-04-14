import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  // Protect only admin routes
  if (req.url.includes("/api") && !req.url.includes("/api/admin/login")) {
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    try {
      verifyToken(token);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}