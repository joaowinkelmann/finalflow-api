-- CreateEnum
CREATE TYPE "NivelAcesso" AS ENUM ('coordenador', 'professor', 'aluno');

-- CreateEnum
CREATE TYPE "TipoAvaliacao" AS ENUM ('Proposta', 'ReelaboracaoProposta', 'TC', 'ReelaboracaoTC');

-- CreateEnum
CREATE TYPE "TipoPrazo" AS ENUM ('EntregaProposta', 'ReelaboracaoProposta', 'EntregaTC', 'ReelaboracaoTC');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nivel_acesso" "NivelAcesso" NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id_curso" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id_aluno" TEXT NOT NULL,
    "matricula" INTEGER NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id_aluno")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id_professor" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id_professor")
);

-- CreateTable
CREATE TABLE "Coordenador" (
    "id_coordenador" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Coordenador_pkey" PRIMARY KEY ("id_coordenador")
);

-- CreateTable
CREATE TABLE "Orientador" (
    "id_orientador" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3),

    CONSTRAINT "Orientador_pkey" PRIMARY KEY ("id_orientador")
);

-- CreateTable
CREATE TABLE "Cronograma" (
    "id_cronograma" TEXT NOT NULL,
    "coordenadorId" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cronograma_pkey" PRIMARY KEY ("id_cronograma")
);

-- CreateTable
CREATE TABLE "Banca" (
    "id_banca" TEXT NOT NULL,
    "cronogramaId" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "professor1Id" TEXT NOT NULL,
    "professor2Id" TEXT NOT NULL,

    CONSTRAINT "Banca_pkey" PRIMARY KEY ("id_banca")
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id_avaliacao" TEXT NOT NULL,
    "bancaId" TEXT NOT NULL,
    "tipoAvaliacao" "TipoAvaliacao" NOT NULL,
    "criterio" TEXT NOT NULL,
    "nota" DOUBLE PRECISION NOT NULL,
    "comentario" TEXT,

    CONSTRAINT "Avaliacao_pkey" PRIMARY KEY ("id_avaliacao")
);

-- CreateTable
CREATE TABLE "Reuniao" (
    "id_reuniao" TEXT NOT NULL,
    "orientadorId" TEXT NOT NULL,
    "dataReuniao" TIMESTAMP(3) NOT NULL,
    "descricao" TEXT NOT NULL,
    "documento" TEXT,

    CONSTRAINT "Reuniao_pkey" PRIMARY KEY ("id_reuniao")
);

-- CreateTable
CREATE TABLE "Prazo" (
    "id_prazo" SERIAL NOT NULL,
    "cronogramaId" TEXT NOT NULL,
    "tipoPrazo" "TipoPrazo" NOT NULL,
    "dataLimite" TIMESTAMP(3) NOT NULL,
    "dataAvaliacaoLimite" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prazo_pkey" PRIMARY KEY ("id_prazo")
);

-- CreateTable
CREATE TABLE "Alerta" (
    "id_alerta" SERIAL NOT NULL,
    "prazoId" INTEGER NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dataAlerta" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alerta_pkey" PRIMARY KEY ("id_alerta")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_idUsuario_key" ON "Aluno"("idUsuario");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_usuarioId_key" ON "Professor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Coordenador_usuarioId_key" ON "Coordenador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Banca_professor1Id_professor2Id_cronogramaId_key" ON "Banca"("professor1Id", "professor2Id", "cronogramaId");

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id_curso") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientador" ADD CONSTRAINT "Orientador_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orientador" ADD CONSTRAINT "Orientador_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cronograma" ADD CONSTRAINT "Cronograma_coordenadorId_fkey" FOREIGN KEY ("coordenadorId") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_cronogramaId_fkey" FOREIGN KEY ("cronogramaId") REFERENCES "Cronograma"("id_cronograma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id_aluno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_professor1Id_fkey" FOREIGN KEY ("professor1Id") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Banca" ADD CONSTRAINT "Banca_professor2Id_fkey" FOREIGN KEY ("professor2Id") REFERENCES "Professor"("id_professor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao" ADD CONSTRAINT "Avaliacao_bancaId_fkey" FOREIGN KEY ("bancaId") REFERENCES "Banca"("id_banca") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reuniao" ADD CONSTRAINT "Reuniao_orientadorId_fkey" FOREIGN KEY ("orientadorId") REFERENCES "Orientador"("id_orientador") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prazo" ADD CONSTRAINT "Prazo_cronogramaId_fkey" FOREIGN KEY ("cronogramaId") REFERENCES "Cronograma"("id_cronograma") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_prazoId_fkey" FOREIGN KEY ("prazoId") REFERENCES "Prazo"("id_prazo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alerta" ADD CONSTRAINT "Alerta_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
