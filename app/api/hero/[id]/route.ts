import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { v2 as cloudinary } from "cloudinary";

export async function DELETE(req: Request, { params }: any) {
  try {
    requireAuth(req);

    const { id } = params;

    const hero = await prisma.hero.findUnique({
      where: { id },
    });

    if (!hero) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await cloudinary.uploader.destroy(hero.publicId);

    await prisma.hero.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted" });

  } catch (err: any) {
    console.error("DELETE HERO ERROR:", err);

    return NextResponse.json(
      { error: "Delete failed", details: err.message },
      { status: 500 }
    );
  }
}