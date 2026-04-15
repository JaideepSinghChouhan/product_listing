import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET(req: Request) {
  try {
    requireAuth(req);

    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product: true,
      },
    });

    return NextResponse.json(leads);
  } catch(err:any) {
    console.error("Admin leads error:", err);
    return NextResponse.json(
      { error: "Unauthorized", details: err.message },
      { status: 401 }
    );
  }
}