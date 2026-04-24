-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('admin', 'superadmin');

-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "role" DROP DEFAULT;

ALTER TABLE "Admin"
ALTER COLUMN "role" TYPE "AdminRole"
USING (
  CASE
    WHEN LOWER("role") = 'superadmin' THEN 'superadmin'::"AdminRole"
    ELSE 'admin'::"AdminRole"
  END
);

ALTER TABLE "Admin" ALTER COLUMN "role" SET DEFAULT 'admin';
