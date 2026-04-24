import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET(req: Request) {
  try {
    requireAuth(req);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const [
      totalProducts,
      totalCategories,
      totalLeads,
      monthlyLeads,
      recentLeads,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.lead.count(),
      prisma.lead.count({
        where: {
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
          },
        },
      }),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return NextResponse.json({
      totalProducts,
      totalCategories,
      totalLeads,
      monthlyLeads,
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