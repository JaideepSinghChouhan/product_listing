import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware"; 

export async function DELETE(req: Request, context: any) {
  try {
    requireAuth(req);

    const { id } = await context.params;

    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed" },
      { status: 500 }
    );
  }
}