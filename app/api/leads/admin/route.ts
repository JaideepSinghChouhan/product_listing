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
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}