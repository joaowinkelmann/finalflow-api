import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

    @IsOptional()
    @IsString()
    template: string;
    
    @IsOptional()
    @IsString()
    context: {
        name,
        message
      }
}
