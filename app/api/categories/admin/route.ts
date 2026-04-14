import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET(req: Request) {
  try {
    requireAuth(req);

    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
  } catch (err) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}   