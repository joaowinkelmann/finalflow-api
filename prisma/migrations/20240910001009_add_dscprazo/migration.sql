/*
  Warnings:

  - Added the required column `dscprazo` to the `Prazo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Prazo" ADD COLUMN     "dscprazo" TEXT NOT NULL;
