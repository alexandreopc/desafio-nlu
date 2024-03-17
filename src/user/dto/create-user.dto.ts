import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @ApiProperty({ example: 'Fulano da Silva' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'teste@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'q123' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  password: string;
}
