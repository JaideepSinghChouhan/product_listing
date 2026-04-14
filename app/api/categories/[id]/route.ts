import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function PUT(req: Request, context: any) {
  try {
    requireAuth(req);

    const { params } = context;
    const { id } = await params; // ✅ FIX

    const data = await req.json();

    const updated = await prisma.category.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized or update failed" },
      { status: 401 }
    );
  }
}
