-- CreateEnum
CREATE TYPE "StatusEntrega" AS ENUM ('Pendente', 'AguardandoAvaliacao', 'Avaliado');

-- CreateEnum
CREATE TYPE "StatusOrientacao" AS ENUM ('EmAndamento', 'Concluido');

-- AlterTable
ALTER TABLE "Alerta" ADD COLUMN     "idreuniao" TEXT;

-- AlterTable
ALTER TABLE "Entrega" ADD COLUMN     "status" "StatusEntrega" NOT NULL DEFAULT 'Pendente',
ALTER COLUMN "arquivo" DROP NOT NULL,
ALTER COLUMN "data_envio" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Orientacao" ADD COLUMN     "status" "StatusOrientacao" NOT NULL DEFAULT 'EmAndamento';

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_idreuniao_fkey" FOREIGN KEY ("idreuniao") REFERENCES "Reuniao"("id_reuniao") ON DELETE SET NULL ON UPDATE CASCADE;
