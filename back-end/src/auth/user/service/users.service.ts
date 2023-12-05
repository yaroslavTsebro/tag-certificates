import {
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IUsersService } from './users-service.interface';
import { CreateUserDto } from '../entity/dto/create-user.dto';
import User, { AuthType, UserRole } from '../entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../repository/users.repository';
import { GoogleProfileDto } from '../entity/dto/oauth/google-profile.dto';

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(UsersRepository) private readonly usersRepository: UsersRepository,
  ) {}
  async getUserByAuthTypeAndClientId(
    authType: AuthType,
    clientId: string,
  ): Promise<User | null> {
    return await this.usersRepository.findOne({
      authType: authType,
      oauthId: clientId,
    });
  }

  async delete(id: number): Promise<void> {
    return await this.usersRepository.findOneAndDelete({ id });
  }

  async changeUsername(id: number, username: string): Promise<User> {
    return await this.usersRepository.findOneAndUpdate({ id }, { username });
  }

  async getById(id: number): Promise<User> {
    return this.usersRepository.findOneOrThrow({ id });
  }

  async verifyUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneOrThrow({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) throw new UnauthorizedException('Wrong credentials');

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.validateCreateUserDto(createUserDto);
    const user = new User({
      ...createUserDto,
      role: UserRole.USER,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    return this.usersRepository.create(user);
  }

  async createFromOauth(
    authType: AuthType,
    profile: GoogleProfileDto,
  ): Promise<User> {
    const user = new User({
      username: profile.username,
      authType: authType,
      email: profile.email,
      role: UserRole.USER,
      oauthId: profile.clientId,
    });
    return this.usersRepository.create(user);
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOneOrThrow([
        { username: createUserDto.username },
        { email: createUserDto.email },
      ]);
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email or username already exists.');
  }
}
