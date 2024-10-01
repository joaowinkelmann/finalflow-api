-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "token_expiracao" TIMESTAMP(3),
ADD COLUMN     "token_recuperacao" TEXT;
