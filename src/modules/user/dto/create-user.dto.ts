import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString() @IsNotEmpty() firstName: string;

  @IsString() @IsNotEmpty() lastName: string;

  @IsString() @IsNotEmpty() phone: string;

  @IsString() @IsNotEmpty() email: string;

  @IsString() @IsNotEmpty() address: string;

  @IsString() @IsNotEmpty() photo: string;

  @IsNumber() @IsNotEmpty() region: number;

  @IsString() @IsNotEmpty() state: string;

  @IsNumber() @IsNotEmpty() role: number;

  @IsString() @IsNotEmpty() password: string;
}
