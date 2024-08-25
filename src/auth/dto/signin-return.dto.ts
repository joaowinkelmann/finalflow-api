export class SignInReturnDto {
    access_token: string;
    user: {
        id: string;
        nome: string;
        email: string;
        nivel_acesso: string;
        primeiro_acesso: boolean;
        avatar: string | null;
    };
}