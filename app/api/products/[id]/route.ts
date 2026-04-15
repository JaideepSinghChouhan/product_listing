import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function PUT(req: Request, context: any) {
  try {
    requireAuth(req);

    const { id } = await context.params;
    const data = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch(err:any) {
    console.error("Product update error:", err);
    return NextResponse.json(
      { error: "Update failed", details: err.message },
      { status: 401 }
    );
  }
}