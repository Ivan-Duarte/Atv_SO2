import { IsEmail, IsNotEmpty, IsString, Max, MaxLength, Min } from "class-validator"

export class CreateUserDto { // Modelo para os dados que chegam das rotas
    
    @IsNotEmpty()//verifica se é vazio
    @IsString()//verifica se é string(se não for não aceita)
    @MaxLength(254)//tamanho maximo da string
    user_name!: string

    @IsNotEmpty()
    @IsString()
    user_password!: string

    @IsEmail()//verifica se é um email
    @MaxLength(80)
    user_email!: string
}