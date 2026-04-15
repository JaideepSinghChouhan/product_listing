import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function PATCH(req: Request, context: any) {
  try {
    requireAuth(req);

    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    const updated = await prisma.product.update({
      where: { id },
      data: {
        status: product?.status === "ACTIVE" ? "HIDDEN" : "ACTIVE",
      },
    });

    return NextResponse.json(updated);
  } catch(err:any) {
    console.error("Product toggle error:", err);
    return NextResponse.json(
      { error: "Toggle failed", details: err.message },
      { status: 500 }
    );
  }
}