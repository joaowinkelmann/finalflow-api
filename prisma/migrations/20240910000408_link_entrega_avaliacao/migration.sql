/*
  Warnings:

  - You are about to drop the column `dataEnvio` on the `Alerta` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `Alerta` table. All the data in the column will be lost.
  - You are about to drop the column `jaEnviado` on the `Alerta` table. All the data in the column will be lost.
  - You are about to drop the column `prazoId` on the `Alerta` table. All the data in the column will be lost.
  - You are about to drop the column `cursoId` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `bancaId` on the `Avaliacao` table. All the data in the column will be lost.
  - You are about to drop the column `orientacaoId` on the `Avaliacao` table. All the data in the column will be lost.
  - You are about to drop the column `tipoAvaliacao` on the `Avaliacao` table. All the data in the column will be lost.
  - You are about to drop the column `alunoId` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `cronogramaId` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `orientacaoId` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `professor1Id` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `professor2Id` on the `Banca` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `Coordenador` table. All the data in the column will be lost.
  - You are about to drop the column `coordenadorId` on the `Cronograma` table. All the data in the column will be lost.
  - You are about to drop the column `dataFim` on the `Cronograma` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `Cronograma` table. All the data in the column will be lost.
  - You are about to drop the column `reuniaoId` on the `Documento` table. All the data in the column will be lost.
  - You are about to drop the column `alunoId` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `dataEnvio` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `orientacaoId` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `prazoId` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPrazo` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `alunoId` on the `Orientacao` table. All the data in the column will be lost.
  - You are about to drop the column `dataFim` on the `Orientacao` table. All the data in the column will be lost.
  - You are about to drop the column `dataInicio` on the `Orientacao` table. All the data in the column will be lost.
  - You are about to drop the column `orientadorId` on the `Orientacao` table. All the data in the column will be lost.
  - You are about to drop the column `tituloTrabalho` on the `Orientacao` table. All the data in the column will be lost.
  - You are about to drop the column `cronogramaId` on the `Prazo` table. All the data in the column will be lost.
  - You are about to drop the column `dataAvaliacaoLimite` on the `Prazo` table. All the data in the column will be lost.
  - You are about to drop the column `dataLimite` on the `Prazo` table. All the data in the column will be lost.
  - You are about to drop the column `tipoPrazo` on the `Prazo` table. All the data in the column will be lost.
  - You are about to drop the column `idUsuario` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `dataReuniao` on the `Reuniao` table. All the data in the column will be lost.
  - You are about to drop the column `orientacaoId` on the `Reuniao` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idusuario]` on the table `Aluno` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idorientacao]` on the table `Banca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idprofessor1,idprofessor2,idcronograma]` on the table `Banca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idusuario]` on the table `Coordenador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idaluno,prazo_tipo]` on the table `Entrega` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idcronograma,prazo_tipo]` on the table `Prazo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idusuario]` on the table `Professor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data_envio` to the `Alerta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idusuario` to the `Alerta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcurso` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idusuario` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avaliacao_tipo` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_avaliacao` to the `Avaliacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idaluno` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcronograma` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idorientacao` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idprofessor1` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idprofessor2` to the `Banca` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idusuario` to the `Coordenador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_fim` to the `Cronograma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_inicio` to the `Cronograma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcoordenador` to the `Cronograma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idreuniao` to the `Documento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_envio` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idaluno` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idorientacao` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idprazo` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prazo_tipo` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_inicio` to the `Orientacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idaluno` to the `Orientacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcronograma` to the `Orientacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idprofessor` to the `Orientacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo_trabalho` to the `Orientacao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_entrega` to the `Prazo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_retorno` to the `Prazo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idcronograma` to the `Prazo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prazo_tipo` to the `Prazo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idusuario` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_reuniao` to the `Reuniao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idorientacao` to the `Reuniao` table without a default value. This is not possible if the table is not empty.
  - The required column `id_usuario` was added to the `Usuario` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_prazoId_fkey";

-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_cursoId_fkey";

-- DropForeignKey
ALTER TABLE "Aluno" DROP CONSTRAINT "Aluno_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Avaliacao" DROP CONSTRAINT "Avaliacao_bancaId_fkey";

-- DropForeignKey
ALTER TABLE "Avaliacao" DROP CONSTRAINT "Avaliacao_orientacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Banca" DROP CONSTRAINT "Banca_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Banca" DROP CONSTRAINT "Banca_cronogramaId_fkey";

-- DropForeignKey
ALTER TABLE "Banca" DROP CONSTRAINT "Banca_orientacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Banca" DROP CONSTRAINT "Banca_professor1Id_fkey";

-- DropForeignKey
ALTER TABLE "Banca" DROP CONSTRAINT "Banca_professor2Id_fkey";

-- DropForeignKey
ALTER TABLE "Coordenador" DROP CONSTRAINT "Coordenador_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Cronograma" DROP CONSTRAINT "Cronograma_coordenadorId_fkey";

-- DropForeignKey
ALTER TABLE "Documento" DROP CONSTRAINT "Documento_reuniaoId_fkey";

-- DropForeignKey
ALTER TABLE "Entrega" DROP CONSTRAINT "Entrega_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Entrega" DROP CONSTRAINT "Entrega_orientacaoId_fkey";

-- DropForeignKey
ALTER TABLE "Entrega" DROP CONSTRAINT "Entrega_prazoId_fkey";

-- DropForeignKey
ALTER TABLE "Orientacao" DROP CONSTRAINT "Orientacao_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "Orientacao" DROP CONSTRAINT "Orientacao_orientadorId_fkey";

-- DropForeignKey
ALTER TABLE "Prazo" DROP CONSTRAINT "Prazo_cronogramaId_fkey";

-- DropForeignKey
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Reuniao" DROP CONSTRAINT "Reuniao_orientacaoId_fkey";

-- DropIndex
DROP INDEX "Aluno_idUsuario_key";

-- DropIndex
DROP INDEX "Banca_orientacaoId_key";

-- DropIndex
DROP INDEX "Banca_professor1Id_professor2Id_cronogramaId_key";

-- DropIndex
DROP INDEX "Coordenador_idUsuario_key";

-- DropIndex
DROP INDEX "Entrega_alunoId_tipoPrazo_key";

-- DropIndex
DROP INDEX "Prazo_cronogramaId_tipoPrazo_key";

-- DropIndex
DROP INDEX "Professor_idUsuario_key";

-- AlterTable
ALTER TABLE "Alerta" DROP COLUMN "dataEnvio",
DROP COLUMN "idUsuario",
DROP COLUMN "jaEnviado",
DROP COLUMN "prazoId",
ADD COLUMN     "data_envio" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "idprazo" TEXT,
ADD COLUMN     "idusuario" TEXT NOT NULL,
ADD COLUMN     "ja_enviado" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "cursoId",
DROP COLUMN "idUsuario",
ADD COLUMN     "idcurso" TEXT NOT NULL,
ADD COLUMN     "idusuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Avaliacao" DROP COLUMN "bancaId",
DROP COLUMN "orientacaoId",
DROP COLUMN "tipoAvaliacao",
ADD COLUMN     "avaliacao_tipo" "TipoAvaliacao" NOT NULL,
ADD COLUMN     "data_avaliacao" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "idbanca" TEXT,
ADD COLUMN     "identrega" TEXT,
ADD COLUMN     "idorientacao" TEXT;

-- AlterTable
ALTER TABLE "Banca" DROP COLUMN "alunoId",
DROP COLUMN "cronogramaId",
DROP COLUMN "orientacaoId",
DROP COLUMN "professor1Id",
DROP COLUMN "professor2Id",
ADD COLUMN     "idaluno" TEXT NOT NULL,
ADD COLUMN     "idcronograma" TEXT NOT NULL,
ADD COLUMN     "idorientacao" TEXT NOT NULL,
ADD COLUMN     "idprofessor1" TEXT NOT NULL,
ADD COLUMN     "idprofessor2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Coordenador" DROP COLUMN "idUsuario",
ADD COLUMN     "idusuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Cronograma" DROP COLUMN "coordenadorId",
DROP COLUMN "dataFim",
DROP COLUMN "dataInicio",
ADD COLUMN     "data_fim" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "data_inicio" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "idcoordenador" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Documento" DROP COLUMN "reuniaoId",
ADD COLUMN     "idreuniao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Entrega" DROP COLUMN "alunoId",
DROP COLUMN "dataEnvio",
DROP COLUMN "orientacaoId",
DROP COLUMN "prazoId",
DROP COLUMN "tipoPrazo",
ADD COLUMN     "data_envio" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "idaluno" TEXT NOT NULL,
ADD COLUMN     "idorientacao" TEXT NOT NULL,
ADD COLUMN     "idprazo" TEXT NOT NULL,
ADD COLUMN     "prazo_tipo" "TipoPrazo" NOT NULL;

-- AlterTable
ALTER TABLE "Orientacao" DROP COLUMN "alunoId",
DROP COLUMN "dataFim",
DROP COLUMN "dataInicio",
DROP COLUMN "orientadorId",
DROP COLUMN "tituloTrabalho",
ADD COLUMN     "data_fim" TIMESTAMPTZ(3),
ADD COLUMN     "data_inicio" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "idaluno" TEXT NOT NULL,
ADD COLUMN     "idcronograma" TEXT NOT NULL,
ADD COLUMN     "idprofessor" TEXT NOT NULL,
ADD COLUMN     "titulo_trabalho" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Prazo" DROP COLUMN "cronogramaId",
DROP COLUMN "dataAvaliacaoLimite",
DROP COLUMN "dataLimite",
DROP COLUMN "tipoPrazo",
ADD COLUMN     "data_entrega" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "data_retorno" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "idcronograma" TEXT NOT NULL,
ADD COLUMN     "prazo_tipo" "TipoPrazo" NOT NULL;

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "idUsuario",
ADD COLUMN     "idusuario" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reuniao" DROP COLUMN "dataReuniao",
DROP COLUMN "orientacaoId",
ADD COLUMN     "data_reuniao" TIMESTAMPTZ(3) NOT NULL,
ADD COLUMN     "idorientacao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_usuario" TEXT NOT NULL,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_idusuario_key" ON "Aluno"("idusuario");

-- CreateIndex
CREATE INDEX "Avaliacao_identrega_idx" ON "Avaliacao"("identrega");

-- CreateIndex
CREATE UNIQUE INDEX "Banca_idorientacao_key" ON "Banca"("idorientacao");

-- CreateIndex
CREATE UNIQUE INDEX "Banca_idprofessor1_idprofessor2_idcronograma_key" ON "Banca"("idprofessor1", "idprofessor2", "idcronograma");

-- CreateIndex
CREATE UNIQUE INDEX "Coordenador_idusuario_key" ON "Coordenador"("idusuario");

-- CreateIndex
CREATE UNIQUE INDEX "Entrega_idaluno_prazo_tipo_key" ON "Entrega"("idaluno", "prazo_tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Prazo_idcronograma_prazo_tipo_key" ON "Prazo"("idcronograma", "prazo_tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_idusuario_key" ON "Professor"("idusuario");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_idcurso_fkey" FOREIGN KEY ("idcurso") REFERENCES "Curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientacao" ADD CONSTRAINT "Orientacao_idprofessor_fkey" FOREIGN KEY ("idprofessor") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientacao" ADD CONSTRAINT "Orientacao_idaluno_fkey" FOREIGN KEY ("idaluno") REFERENCES "Aluno"("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientacao" ADD CONSTRAINT "Orientacao_idcronograma_fkey" FOREIGN KEY ("idcronograma") REFERENCES "Cronograma"("id_cronograma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cronograma" ADD CONSTRAINT "Cronograma_idcoordenador_fkey" FOREIGN KEY ("idcoordenador") REFERENCES "Coordenador"("id_coordenador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_idcronograma_fkey" FOREIGN KEY ("idcronograma") REFERENCES "Cronograma"("id_cronograma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_idaluno_fkey" FOREIGN KEY ("idaluno") REFERENCES "Aluno"("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_idprofessor1_fkey" FOREIGN KEY ("idprofessor1") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_idprofessor2_fkey" FOREIGN KEY ("idprofessor2") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_idorientacao_fkey" FOREIGN KEY ("idorientacao") REFERENCES "Orientacao"("id_orientacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_idbanca_fkey" FOREIGN KEY ("idbanca") REFERENCES "Banca"("id_banca") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_idorientacao_fkey" FOREIGN KEY ("idorientacao") REFERENCES "Orientacao"("id_orientacao") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_identrega_fkey" FOREIGN KEY ("identrega") REFERENCES "Entrega"("id_entrega") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reuniao" ADD CONSTRAINT "Reuniao_idorientacao_fkey" FOREIGN KEY ("idorientacao") REFERENCES "Orientacao"("id_orientacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Documento" ADD CONSTRAINT "Documento_idreuniao_fkey" FOREIGN KEY ("idreuniao") REFERENCES "Reuniao"("id_reuniao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prazo" ADD CONSTRAINT "Prazo_idcronograma_fkey" FOREIGN KEY ("idcronograma") REFERENCES "Cronograma"("id_cronograma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_idaluno_fkey" FOREIGN KEY ("idaluno") REFERENCES "Aluno"("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_idorientacao_fkey" FOREIGN KEY ("idorientacao") REFERENCES "Orientacao"("id_orientacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_idprazo_fkey" FOREIGN KEY ("idprazo") REFERENCES "Prazo"("id_prazo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_idprazo_fkey" FOREIGN KEY ("idprazo") REFERENCES "Prazo"("id_prazo") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "Usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;
