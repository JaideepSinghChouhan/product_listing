import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { uploadImage } from "@/lib/upload";

export async function POST(req: Request) {
  try {
    requireAuth(req);

    const body = await req.json();

    const { name, description, categoryId, images, moq, sku     } = body;
    // Upload images
    if (!sku) {
    return NextResponse.json(
    { error: "SKU is required" },
    { status: 400 }
    );
    }
    const uploadedImages = await Promise.all(
      images.map((img: string) => uploadImage(img))
    );
    console.log(uploadedImages);
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        categoryId,
        moq,
        images: uploadedImages,
        sku,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}


export async function GET() {
  const products = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      category: {
        status: "ACTIVE",
      },
    },
    include: {
      category: true,
    },
  });

  return NextResponse.json(products);
}