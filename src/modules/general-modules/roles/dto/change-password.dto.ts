import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
