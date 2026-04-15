import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET(req: Request) {
  try {
    requireAuth(req);

    const [
      totalProducts,
      totalCategories,
      totalLeads,
      recentLeads,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.lead.count(),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      totalCategories,
      totalLeads,
      recentLeads,
    });
  } catch(err:any) {
    console.error("Dashboard error:", err);
    return NextResponse.json(
      { error: "Unauthorized", details: err.message },
      { status: 401 }
    );
  }
}