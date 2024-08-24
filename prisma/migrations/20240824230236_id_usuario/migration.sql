/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Alerta` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Coordenador` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Professor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idUsuario]` on the table `Coordenador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idUsuario]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idUsuario` to the `Alerta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Coordenador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idUsuario` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Coordenador" DROP CONSTRAINT "Coordenador_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_usuarioId_fkey";

-- DropIndex
DROP INDEX "Coordenador_usuarioId_key";

-- DropIndex
DROP INDEX "Professor_usuarioId_key";

-- AlterTable
ALTER TABLE "Alerta" DROP COLUMN "usuarioId",
ADD COLUMN     "idUsuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Coordenador" DROP COLUMN "usuarioId",
ADD COLUMN     "idUsuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "usuarioId",
ADD COLUMN     "idUsuario" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Coordenador_idUsuario_key" ON "Coordenador"("idUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_idUsuario_key" ON "Professor"("idUsuario");

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
