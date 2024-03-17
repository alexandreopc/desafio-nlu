import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      delete user.password;

      if (isPasswordValid) {
        return user;
      }
    }
    throw new Error('email or password isnt correct');
  }

  signin(user: User) {
    const { id, email, name, role } = user;
    const jwtPayload = {
      sub: id,
      email,
      name,
      role,
    };
    const jwtToekn = this.jwtService.sign(jwtPayload);
    return { jwtToekn };
  }
}
