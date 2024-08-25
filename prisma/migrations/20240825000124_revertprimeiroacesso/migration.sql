/*
  Warnings:

  - You are about to drop the column `first_access` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "first_access",
ADD COLUMN     "primeiro_acesso" BOOLEAN NOT NULL DEFAULT true;
