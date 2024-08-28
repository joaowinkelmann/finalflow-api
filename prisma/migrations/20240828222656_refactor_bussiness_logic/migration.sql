/*
  Warnings:

  - You are about to drop the column `orientadorId` on the `Reuniao` table. All the data in the column will be lost.
  - You are about to drop the `Orientador` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `orientacaoId` to the `Reuniao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orientador" DROP CONSTRAINT "Orientador_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Orientador" DROP CONSTRAINT "Orientador_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Reuniao" DROP CONSTRAINT "Reuniao_orientadorId_fkey";

-- AlterTable
ALTER TABLE "Reuniao" DROP COLUMN "orientadorId",
ADD COLUMN     "orientacaoId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Orientador";

-- CreateTable
CREATE TABLE "Orientacao" (
    "id_orientacao" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "dataInicio" TIMESTAMPTZ(3) NOT NULL,
    "dataFim" TIMESTAMPTZ(3),

    CONSTRAINT "Orientacao_pkey" PRIMARY KEY ("id_orientacao")
);

-- AddForeignKey
ALTER TABLE "Orientacao" ADD CONSTRAINT "Orientacao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientacao" ADD CONSTRAINT "Orientacao_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reuniao" ADD CONSTRAINT "Reuniao_orientacaoId_fkey" FOREIGN KEY ("orientacaoId") REFERENCES "Orientacao"("id_orientacao") ON DELETE RESTRICT ON UPDATE CASCADE;
