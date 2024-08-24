/*
  Warnings:

  - The primary key for the `Alerta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prazo` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_prazoId_fkey";

-- AlterTable
ALTER TABLE "Alerta" DROP CONSTRAINT "Alerta_pkey",
ALTER COLUMN "id_alerta" DROP DEFAULT,
ALTER COLUMN "id_alerta" SET DATA TYPE TEXT,
ALTER COLUMN "prazoId" SET DATA TYPE TEXT,
ALTER COLUMN "dataAlerta" SET DATA TYPE TIMESTAMPTZ(3),
ADD CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id_alerta");
DROP SEQUENCE "Alerta_id_alerta_seq";

-- AlterTable
ALTER TABLE "Cronograma" ALTER COLUMN "dataInicio" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "dataFim" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Orientador" ALTER COLUMN "dataInicio" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "dataFim" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Prazo" DROP CONSTRAINT "Prazo_pkey",
ALTER COLUMN "id_prazo" DROP DEFAULT,
ALTER COLUMN "id_prazo" SET DATA TYPE TEXT,
ALTER COLUMN "dataLimite" SET DATA TYPE TIMESTAMPTZ(3),
ALTER COLUMN "dataAvaliacaoLimite" SET DATA TYPE TIMESTAMPTZ(3),
ADD CONSTRAINT "Prazo_pkey" PRIMARY KEY ("id_prazo");
DROP SEQUENCE "Prazo_id_prazo_seq";

-- AlterTable
ALTER TABLE "Reuniao" ALTER COLUMN "dataReuniao" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "data_cadastro" SET DATA TYPE TIMESTAMPTZ(3);

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_prazoId_fkey" FOREIGN KEY ("prazoId") REFERENCES "Prazo"("id_prazo") ON DELETE RESTRICT ON UPDATE CASCADE;
