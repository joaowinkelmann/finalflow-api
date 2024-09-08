export class SignInReturnDto {
    access_token: string;
    user: {
        idusuario: string;
        nome: string;
        email: string;
        nivel_acesso: string;
        primeiro_acesso: boolean;
        avatar: string | null;
    };
}