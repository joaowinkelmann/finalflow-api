/*
  Warnings:

  - A unique constraint covering the columns `[idaluno,idprazo,idorientacao]` on the table `Entrega` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Entrega_idaluno_prazo_tipo_key";

-- CreateIndex
CREATE UNIQUE INDEX "Entrega_idaluno_idprazo_idorientacao_key" ON "Entrega"("idaluno", "idprazo", "idorientacao");
