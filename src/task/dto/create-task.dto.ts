import { IsString, MaxLength } from 'class-validator';
import { Task } from '../entities/task.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto extends Task {
  @ApiProperty({ example: 'Criar uma nova task' })
  @IsString()
  @MaxLength(140)
  name: string;

  @ApiProperty({
    example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  })
  @IsString()
  content: string;
}
