import { UserType } from 'src/auth/enum/user-type.enum';

export class User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: UserType;
}
