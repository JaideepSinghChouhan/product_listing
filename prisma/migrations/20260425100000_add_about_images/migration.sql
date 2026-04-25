-- CreateTable
CREATE TABLE "AboutImage" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "publicId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AboutImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AboutImage_key_key" ON "AboutImage"("key");
