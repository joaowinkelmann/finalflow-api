import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlertaDto {
    // id_alerta  String      @id @default(uuid())
    // prazoId    String
    // idUsuario  String
    // assunto    String
    // mensagem   String
    // dataAlerta DateTime   @db.Timestamptz(3)
    // jaEnviado  Boolean    @default(false)
    // Prazo      Prazo      @relation(fields: [prazoId], references: [id_prazo])
    // Usuario    Usuario    @relation(fields: [idUsuario], references: [id])

    // @IsNotEmpty()
    // @IsString()
    prazoId: string;

    @IsNotEmpty()
    @IsString()
    idUsuario: string;
    
    @IsNotEmpty()
    @IsString()
    assunto: string;

    @IsNotEmpty()
    @IsString()
    mensagem: string;

    @IsNotEmpty()
    // @IsDate()
    dataAlerta: string;
}