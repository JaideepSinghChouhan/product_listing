import { requireAuth } from "@/lib/authMiddleware";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: any) {
  try {
    requireAuth(req);

    const { id } =await params;

    const hero = await prisma.hero.findUnique({
      where: { id },
    });

    // optional: delete from Cloudinary using publicId

    await prisma.hero.delete({
      where: { id },
    });

    return Response.json({ message: "Deleted" });
  } catch (err) {
    return Response.json({ error: "Delete failed" }, { status: 500 });
  }
}