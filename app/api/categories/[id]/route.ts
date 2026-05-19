import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { deleteImage } from "@/lib/upload";

export async function PUT(req: Request, context: any) {
  try {
    requireAuth(req);

    const { params } = context;
    const { id } = await params;

    const { name, description, imageUrl, publicId } = await req.json();

    // Get existing category to check if image changed
    const existing = await prisma.category.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // If updating with a new image (publicId changed), delete the old one
    if (existing.publicId && publicId && existing.publicId !== publicId) {
      try {
        await deleteImage(existing.publicId);
      } catch (err: any) {
        console.warn("Failed to delete old image:", err?.message);
        // Continue anyway - don't block the update
      }
    }

    // Update the category with new data
    const updated = await prisma.category.update({
      where: { id },
      data: {
        name,
        description,
        imageUrl: imageUrl || existing.imageUrl,
        publicId: publicId || existing.publicId,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("Update category error:", err);
    const status = err?.message?.includes("No token") ? 401 : 500;
    return NextResponse.json(
      { error: "Failed to update category", details: err.message },
      { status }
    );
  }
}

export async function DELETE(req: Request, context: any) {
  try {
    requireAuth(req);
    const { params } = context;
    const { id } = await params;

    // Check if category has products
    const productsCount = await prisma.product.count({
      where: { categoryId: id },
    });

    if (productsCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${productsCount} product(s). Delete or move products first.` },
        { status: 400 }
      );
    }

    // Delete category image from Cloudinary first
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (category?.publicId) {
      try {
        await deleteImage(category.publicId);
        console.log("Deleted category image from Cloudinary:", category.publicId);
      } catch (err: any) {
        console.warn("Failed to delete category image:", err?.message);
        // Continue anyway
      }
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (err: any) {
    console.error("Delete category error:", err);
    const status = err?.message?.includes("No token") ? 401 : 500;
    return NextResponse.json(
      { error: "Failed to delete category", details: err.message },
      { status }
    );
  }
}
