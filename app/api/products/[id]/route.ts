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

export async function DELETE(req: Request, { params }: any) {
  try {
    const { id } =await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted" });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);

    return NextResponse.json(
      { error: "Delete failed", details: err.message },
      { status: 500 }
    );
  }
}