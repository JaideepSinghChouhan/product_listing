import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(clients);
}

import { requireAuth } from "@/lib/authMiddleware";
import { uploadImage } from "@/lib/upload";

export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { name, image } = await req.json();

    const uploaded = await uploadImage(image);

    const client = await prisma.client.create({
      data: {
        name,
        logoUrl: uploaded.url,
        publicId: uploaded.publicId,
      },
    });

    return NextResponse.json(client);
  } catch (err) {
    console.error("CLIENT CREATE ERROR:", err);

    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 }
    );
  }
}