import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentoDto } from './create-documento.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {

    @IsString()
    @IsNotEmpty()
    id_documento: string;
}
