import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET(req: Request) {
  try {
    requireAuth(req);

    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
  } catch (err:any) {
    console.error("Fetch error:", err);
    return NextResponse.json(
      { error: "Unauthorized", details: err.message },
      { status: 401 }
    );
  }
}   