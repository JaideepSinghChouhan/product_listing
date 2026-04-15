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

    const category = await prisma.category.create({
      data: {
        name,
        description,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(category);
  } catch (err:any) {
    console.error("Create error:", err);
    return NextResponse.json(
      { error: "Unauthorized or failed to create category", details: err.message },
      { status: 401 }
    );
  }
}