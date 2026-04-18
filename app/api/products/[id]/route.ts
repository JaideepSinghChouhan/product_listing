import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { uploadImage, deleteImage } from "@/lib/upload";

export async function GET(req: Request, { params }: any) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(req: Request, context: any) {
  try {
    requireAuth(req);

    const { id } = await context.params;
    const data = await req.json();

    const {
      newImages = [],
      existingImages = [],
      removedImageIds = [],
      ...updateData
    } = data;

    if (!Array.isArray(newImages) || !Array.isArray(existingImages)) {
      return NextResponse.json(
        { error: "Invalid image payload" },
        { status: 400 }
      );
    }

    const totalImagesAfterUpdate = existingImages.length + newImages.length;
    if (totalImagesAfterUpdate > 5) {
      return NextResponse.json(
        { error: "Maximum 5 images allowed per product" },
        { status: 400 }
      );
    }

    let allImages = [...existingImages];

    // Upload new images
    if (newImages.length > 0) {
      const uploadedImages = await Promise.all(
        newImages.map((img: string) => uploadImage(img))
      );
      allImages = [...allImages, ...uploadedImages];
    }

    // Delete removed images from Cloudinary
    if (removedImageIds.length > 0) {
      await Promise.all(removedImageIds.map((publicId: string) => deleteImage(publicId)));
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        images: allImages,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("Product update error:", err);
    return NextResponse.json(
      { error: "Update failed", details: err.message },
      { status: 401 }
    );
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    const { id } = await params;

    // Get product to delete all its images
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (product && product.images) {
      const images = product.images as any[];
      await Promise.all(
        images.map((img) => deleteImage(img.publicId))
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted" });
  } catch (err: any) {
    console.error("DELETE ERROR:", err);

    return NextResponse.json(
      { error: "Delete failed", details: err.message },
      { status: 500 }
    );
  }
}