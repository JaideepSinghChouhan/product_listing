/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `Hero` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Hero` table. All the data in the column will be lost.
  - Added the required column `images` to the `Hero` table without a default value. This is not possible if the table is not empty.
  - Made the column `subtext` on table `Hero` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Hero" DROP COLUMN "imageUrl",
DROP COLUMN "publicId",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "images" JSONB NOT NULL,
ALTER COLUMN "subtext" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "customization" TEXT;

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mapUrl" TEXT NOT NULL,

    CONSTRAINT "ContactInfo_pkey" PRIMARY KEY ("id")
);
