import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMailDto {
    @IsEmail()
    @IsNotEmpty()
    to: string;

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    text: string;
}
