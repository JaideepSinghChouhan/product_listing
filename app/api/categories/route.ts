import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { status: "ACTIVE" },
  });

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  try {
    const { name, description, imageUrl, publicId } = await req.json();

    const category = await prisma.category.create({
      data: {
        name,
        description,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}