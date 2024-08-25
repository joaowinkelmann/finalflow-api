-- DropForeignKey
ALTER TABLE "Cronograma" DROP CONSTRAINT "Cronograma_coordenadorId_fkey";

-- AddForeignKey
ALTER TABLE "Cronograma" ADD CONSTRAINT "Cronograma_coordenadorId_fkey" FOREIGN KEY ("coordenadorId") REFERENCES "Coordenador"("id_coordenador") ON DELETE RESTRICT ON UPDATE CASCADE;
