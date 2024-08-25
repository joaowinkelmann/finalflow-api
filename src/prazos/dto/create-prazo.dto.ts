import { IsNotEmpty } from 'class-validator';
import { TipoPrazo } from '@prisma/client';

export class CreatePrazoDto {
    // id_prazo            String        @id @default(uuid())
    // cronogramaId        String
    // tipoPrazo           TipoPrazo
    // dataLimite          DateTime     @db.Timestamptz(3)
    // dataAvaliacaoLimite DateTime     @db.Timestamptz(3)
    // Cronograma          Cronograma @relation(fields: [cronogramaId], references: [id_cronograma])
    // Alerta              Alerta[]

    @IsNotEmpty()
    cronogramaId: string;

    @IsNotEmpty()
    tipoPrazo: TipoPrazo;

    @IsNotEmpty()
    dataLimite: string;

    @IsNotEmpty()
    dataAvaliacaoLimite: string;
}
