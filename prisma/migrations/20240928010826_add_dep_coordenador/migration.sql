-- AlterTable
ALTER TABLE "Coordenador" ADD COLUMN     "departamento" TEXT;

-- AlterTable
ALTER TABLE "Professor" ALTER COLUMN "departamento" DROP NOT NULL;
