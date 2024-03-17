import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) throw new BadRequestException('user already created');

    const data: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const result = await this.prisma.user.create({ data });
    delete result.password;

    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    const result = await this.prisma.user.findUnique({ where: { id } });
    delete result.password;

    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const newPassword = await bcrypt.hash(updateUserDto.password, 10);
      const data: UpdateUserDto = {
        ...updateUserDto,
        password: newPassword,
      };

      const result = await this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
      delete result.password;

      return result;
    }

    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
    delete result.password;

    return result;
  }

  async updateRole(id: number, role: number) {
    const result = await this.prisma.user.update({
      where: {
        id,
      },
      data: role,
    });
    delete result.password;

    return result;
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
