import { IsNotEmpty, IsString } from "class-validator";

export class CreateCronogramaDto {
    //     id_cronograma String    @id @default(uuid())
    //     coordenadorId String
    //     descricao     String
    //     dataInicio    DateTime  @db.Timestamptz(3)
    //     dataFim       DateTime  @db.Timestamptz(3)
    //     Professor     Professor @relation(fields: [coordenadorId], references: [id_professor])
    //   }
    

    // nao precisa, pega da request
    // @IsNotEmpty()
    // @IsString()
    // coordenadorId: string;

    @IsNotEmpty()
    @IsString()
    descricao: string;

    @IsNotEmpty()
    // @IsDate()
    dataInicio: string;

    @IsNotEmpty()
    // @IsDate()
    dataFim: string;
}
