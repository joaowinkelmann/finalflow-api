/*
  Warnings:

  - A unique constraint covering the columns `[cronogramaId,tipoPrazo]` on the table `Prazo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prazo_cronogramaId_tipoPrazo_key" ON "Prazo"("cronogramaId", "tipoPrazo");
