-- CreateTable
CREATE TABLE "Entrega" (
    "id_entrega" TEXT NOT NULL,
    "tipoPrazo" "TipoPrazo" NOT NULL,
    "dataEnvio" TIMESTAMPTZ(3) NOT NULL,
    "arquivo" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "orientacaoId" TEXT NOT NULL,
    "prazoId" TEXT NOT NULL,

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id_entrega")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entrega_alunoId_tipoPrazo_key" ON "Entrega"("alunoId", "tipoPrazo");

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_orientacaoId_fkey" FOREIGN KEY ("orientacaoId") REFERENCES "Orientacao"("id_orientacao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_prazoId_fkey" FOREIGN KEY ("prazoId") REFERENCES "Prazo"("id_prazo") ON DELETE RESTRICT ON UPDATE CASCADE;
