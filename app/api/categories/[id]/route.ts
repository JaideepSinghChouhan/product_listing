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
  } catch (err:any) {
    console.error("Update error:", err);
    return NextResponse.json(
      { error: "Unauthorized or update failed", details: err.message },
      { status: 401 }
    );
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    requireAuth(req);
    const { params } = context;
    const { id } = await params; // ✅ FIX
    await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Category deleted" });
  } catch (err:any) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { error: "Unauthorized or delete failed", details: err.message },
      { status: 401 }
    );
  }
}
