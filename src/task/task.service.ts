import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const task = await this.findByTaskName(createTaskDto.name);
    if (task) throw new BadRequestException('task already created');

    const data: CreateTaskDto = {
      ...createTaskDto,
      authorId: user.id,
    };
    return await this.prisma.task.create({ data });
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findById(id: number) {
    return this.prisma.task.findUnique({ where: { id } });
  }

  findByTaskName(name: string) {
    return this.prisma.task.findUnique({ where: { name } });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id,
      },
      data: {
        ...updateTaskDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }
}
