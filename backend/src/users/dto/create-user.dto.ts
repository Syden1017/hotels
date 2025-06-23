import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  contactPhone?: string;
  role?: UserRole;
}
