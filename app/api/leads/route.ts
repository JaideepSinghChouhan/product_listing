import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, contact, message, quantity, productId } =
      await req.json();

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Name and contact required" },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name,
        contact,
        message,
        quantity,
        productId,
      },
    });

    return NextResponse.json(lead);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}