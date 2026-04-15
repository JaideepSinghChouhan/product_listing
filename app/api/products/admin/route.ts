import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET(req: Request) {
  try {
    requireAuth(req);

    const products = await prisma.product.findMany({
      include: { category: true },
    });

    return NextResponse.json(products);
  } catch(err:any) {
    console.error("Admin products error:", err);
    return NextResponse.json({ error: "Unauthorized", details: err.message }, { status: 401 });
  }
}