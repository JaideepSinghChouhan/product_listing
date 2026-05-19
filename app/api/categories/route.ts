import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE" },
  });

  return NextResponse.json(categories);
}



export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { name, description, imageUrl, publicId } = await req.json();

    if (!imageUrl || !publicId) {
      return NextResponse.json(
        { error: "imageUrl and publicId are required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.create({
      data: {
        name,
        description,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(category);
  } catch (err: any) {
    console.error("Create category error:", err);
    const status = err?.message?.includes("No token") ? 401 : 500;
    return NextResponse.json(
      { error: "Failed to create category", details: err.message },
      { status }
    );
  }
}