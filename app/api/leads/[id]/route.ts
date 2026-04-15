import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/authMiddleware";

export async function PATCH(req: Request, { params }: any) {
  try {
    requireAuth(req);

    const { id } = await params;
    const { status, note } = await req.json();

    const lead = await prisma.lead.findUnique({
      where: { id },
    });


    const existingNotes = Array.isArray(lead?.notes)
  ? lead.notes
  : [];

    const updatedNotes = note
    ? [
      ...existingNotes,
      {
        text: note,
        createdAt: new Date(),
      },
    ]
    : existingNotes;

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        status,
        notes: updatedNotes,
      },
    });

    return NextResponse.json(updated);
  } catch(err :any) {
    console.error("Lead update error:", err);
    return NextResponse.json(
      { error: "Update failed", details: err.message },
      { status: 500 }
    );
  }
}