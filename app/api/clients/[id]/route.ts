import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: any) {
  try {
    requireAuth(req);

    const { id } = await params;

    const client = await prisma.client.findUnique({
      where: { id },
    });

    if (client?.publicId) {
      // optional: delete from cloudinary
    }

    await prisma.client.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}