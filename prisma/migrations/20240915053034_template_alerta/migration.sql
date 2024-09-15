-- AlterTable
ALTER TABLE "Alerta" ADD COLUMN     "contexto" JSONB,
ADD COLUMN     "template" TEXT,
ALTER COLUMN "mensagem" DROP NOT NULL;
