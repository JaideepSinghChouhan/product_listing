import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function GET() {
  const contact = await prisma.contactInfo.findFirst();
  return NextResponse.json(contact);
}


export async function POST(req: Request) {
  try {
    requireAuth(req);

    const { address, phone, email, mapUrl } = await req.json();

    const existing = await prisma.contactInfo.findFirst();

    let contact;

    if (existing) {
      contact = await prisma.contactInfo.update({
        where: { id: existing.id },
        data: { address, phone, email, mapUrl },
      });
    } else {
      contact = await prisma.contactInfo.create({
        data: { address, phone, email, mapUrl },
      });
    }

    return NextResponse.json(contact);
  } catch (err:any) {
    console.error("Contact update/create error:", err);
    return NextResponse.json(
      { error: "Failed", details: err.message },
      { status: 500 }
    );
  }
}