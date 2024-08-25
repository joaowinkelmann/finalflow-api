-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "first_access" BOOLEAN NOT NULL DEFAULT true;
