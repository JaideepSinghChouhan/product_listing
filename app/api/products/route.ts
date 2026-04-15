import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";
import { uploadImage } from "@/lib/upload";

export async function POST(req: Request) {
  try {
    requireAuth(req);

    const body = await req.json();

    const { name, description, categoryId, images, moq, sku, customization } = body;
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
        customization,
        categoryId,
        moq,
        images: uploadedImages,
        sku,
      },
    });

    return NextResponse.json(product);
  } catch (err:any) {
    console.error("PRODUCT CREATE ERROR:", err);
    return NextResponse.json(
      { error: "Failed to create product", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId");

    const skip = (page - 1) * limit;

    const where: any = {
      status: "ACTIVE",
      category: {
        status: "ACTIVE",
      },
    };

    // 🔍 Search filter
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { sku: { contains: search, mode: "insensitive" } },
      ];
    }

    // 📂 Category filter
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
        },
      }),

      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err:any) {
    console.error("PRODUCT GET ERROR:", err);

    return NextResponse.json(
      { error: "Failed to fetch products", details: err.message },
      { status: 500 }
    );
  }
}