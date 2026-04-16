import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { v2 as cloudinary } from "cloudinary";

export async function DELETE(req: Request, context: any) {
  try {
    requireAuth(req);

    const { id } = await context.params;
    const { publicId } = await req.json();

    // delete from cloudinary
    await cloudinary.uploader.destroy(publicId);

    // get hero
    const hero = await prisma.hero.findUnique({
      where: { id },
    });

    if (!hero) {
      return NextResponse.json({ error: "Hero not found" }, { status: 404 });
    }

    // filter images
    const updatedImages = (hero.images as any[]).filter(
      (img) => img.publicId !== publicId
    );

    // update DB
    await prisma.hero.update({
      where: { id },
      data: {
        images: updatedImages,
      },
    });

    return NextResponse.json({ message: "Image deleted" });

  } catch (err: any) {
    console.error("DELETE IMAGE ERROR:", err);

    return NextResponse.json(
      { error: "Delete failed", details: err.message },
      { status: 500 }
    );
  }
}