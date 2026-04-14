import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const data = await req.json();

  const updated = await prisma.category.update({
    where: { id },
    data,
  });

  return NextResponse.json(updated);
}


export async function DELETE(req: Request, { params }: any) {
  const { id } = params;

  await prisma.category.update({
    where: { id },
    data: { status: "HIDDEN" },
  });

  return NextResponse.json({ message: "Category hidden" });
}