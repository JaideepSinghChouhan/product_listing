/*
  Warnings:

  - You are about to drop the column `images` on the `Hero` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Hero` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicId` to the `Hero` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hero" DROP COLUMN "images",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "publicId" TEXT NOT NULL,
ALTER COLUMN "heading" DROP NOT NULL,
ALTER COLUMN "subtext" DROP NOT NULL;
