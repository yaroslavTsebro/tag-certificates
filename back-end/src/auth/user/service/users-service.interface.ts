import { CreateUserDto } from '../entity/dto/create-user.dto';
import { GoogleProfileDto } from '../entity/dto/oauth/google-profile.dto';
import User, { AuthType } from '../entity/user.entity';

export const USER_SERVICE = Symbol('IUserService');

export interface IUsersService {
  create(dto: CreateUserDto): Promise<User>;
  createFromOauth(authType: AuthType, profile: GoogleProfileDto): Promise<User>;
  verifyUser(email: string, password: string): Promise<User>;
  getById(id: number): Promise<User>;
  changeUsername(id: number, username: string): Promise<User>;
  delete(id: number): Promise<void>;
  getUserByAuthTypeAndClientId(
    authType: AuthType,
    clientId: string,
  ): Promise<User | null>;
}
