import { IsString, MaxLength } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto extends Task {
  @IsString()
  @MaxLength(140)
  name: string;

  @IsString()
  content: string;
}
