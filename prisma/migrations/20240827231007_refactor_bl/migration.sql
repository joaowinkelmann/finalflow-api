/*
  Warnings:

  - You are about to drop the column `dataAlerta` on the `Alerta` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `Coordenador` table. All the data in the column will be lost.
  - You are about to drop the column `documento` on the `Reuniao` table. All the data in the column will be lost.
  - You are about to drop the column `orientadorId` on the `Reuniao` table. All the data in the column will be lost.
  - You are about to drop the `Orientador` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orientacaoId]` on the table `Banca` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `dataEnvio` to the `Alerta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientacaoId` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientacaoId` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orientacaoId` to the `Reuniao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_prazoId_fkey";

-- DropForeignKey
ALTER TABLE "Orientador" DROP CONSTRAINT "Orientador_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Orientador" DROP CONSTRAINT "Orientador_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Reuniao" DROP CONSTRAINT "Reuniao_orientadorId_fkey";

-- AlterTable
ALTER TABLE "Alerta" DROP COLUMN "dataAlerta",
ADD COLUMN     "dataEnvio" TIMESTAMPTZ(3) NOT NULL,
ALTER COLUMN "prazoId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Avaliacao" ADD COLUMN     "orientacaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Banca" ADD COLUMN     "orientacaoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Coordenador" DROP COLUMN "departamento";

-- AlterTable
ALTER TABLE "Reuniao" DROP COLUMN "documento",
DROP COLUMN "orientadorId",
ADD COLUMN     "orientacaoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Orientador";

-- CreateTable
CREATE TABLE "Orientacao" (
    "id_orientacao" TEXT NOT NULL,
    "orientadorId" TEXT NOT NULL,
    "idBanca" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "dataInicio" TIMESTAMPTZ(3) NOT NULL,
    "dataFim" TIMESTAMPTZ(3),
    "tituloTrabalho" TEXT NOT NULL,

    CONSTRAINT "Orientacao_pkey" PRIMARY KEY ("id_orientacao")
);

-- CreateTable
CREATE TABLE "Documento" (
    "id_documento" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "arquivo" TEXT NOT NULL,
    "reuniaoId" TEXT NOT NULL,

    CONSTRAINT "Documento_pkey" PRIMARY KEY ("id_documento")
);

-- CreateIndex
CREATE UNIQUE INDEX "Banca_orientacaoId_key" ON "Banca"("orientacaoId");

-- AddForeignKey
ALTER TABLE "Orientacao" ADD CONSTRAINT "Orientacao_orientadorId_fkey" FOREIGN KEY ("orientadorId") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientacao" ADD CONSTRAINT "Orientacao_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_orientacaoId_fkey" FOREIGN KEY ("orientacaoId") REFERENCES "Orientacao"("id_orientacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_orientacaoId_fkey" FOREIGN KEY ("orientacaoId") REFERENCES "Orientacao"("id_orientacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reuniao" ADD CONSTRAINT "Reuniao_orientacaoId_fkey" FOREIGN KEY ("orientacaoId") REFERENCES "Orientacao"("id_orientacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "Reuniao"("id_reuniao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_prazoId_fkey" FOREIGN KEY ("prazoId") REFERENCES "Prazo"("id_prazo") ON DELETE SET NULL ON UPDATE CASCADE;
