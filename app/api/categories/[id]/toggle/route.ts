import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function PATCH(req: Request, context: any) {
  try {
    requireAuth(req);

    const { id } = await context.params;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.category.update({
      where: { id },
      data: {
        status: category.status === "ACTIVE" ? "HIDDEN" : "ACTIVE",
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Toggle failed" },
      { status: 500 }
    );
  }
}