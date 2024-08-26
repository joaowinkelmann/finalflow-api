import { IsBase64, IsNotEmpty } from "class-validator";

export class SetAvatarDto {
  @IsBase64()
  @IsNotEmpty({
    message: "O campo base64data é obrigatório"
  })
  base64data: string;
}