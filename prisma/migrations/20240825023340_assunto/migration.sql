/*
  Warnings:

  - Added the required column `assunto` to the `Alerta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alerta" ADD COLUMN     "assunto" TEXT NOT NULL;
