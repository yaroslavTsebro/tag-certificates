import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ITokenService,
  TOKEN_SERVICE,
} from '../token/service/token-service.interface';
import {
  IUsersService,
  USER_SERVICE,
} from '../user/service/users-service.interface';
import { ChangeUsernameDto } from '../user/entity/dto/change-username.dto';
import User from '../user/entity/user.entity';
import { AccessTokenPayload } from '../entity/access-token-payload.interface';
import { RefreshTokenPayload } from '../entity/refresh-token-payload.interface';
import { CreateUserDto } from '../user/entity/dto/create-user.dto';

export type Tokens = { accessToken: string; refreshToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(USER_SERVICE) private readonly usersService: IUsersService,
    @Inject(TOKEN_SERVICE) private readonly tokenService: ITokenService,
    @Inject('JwtAccessTokenService')
    private readonly accessTokenService: JwtService,
    @Inject('JwtRefreshTokenService')
    private readonly refreshTokenService: JwtService,
  ) {}

  async changeUsername(user: User, dto: ChangeUsernameDto) {
    try {
      return await this.usersService.changeUsername(user.id, dto.username);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(`Cant change username`);
    }
  }

  async delete(user: User) {
    try {
      return await this.usersService.delete(user.id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(`Cant delete user`);
    }
  }

  async logout(user: User) {
    try {
      await this.tokenService.delete(user.id);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(`Cant logout`);
    }
  }

  async getById(userId: number): Promise<User> {
    try {
      return this.usersService.getById(userId);
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(`Cant get user by id`);
    }
  }

  async getTokens(user: User): Promise<Tokens> {
    try {
      const accessTokenPayload: AccessTokenPayload = {
        id: user.id,
        username: user.username,
      };
      const refreshTokenPayload: RefreshTokenPayload = {
        id: user.id,
      };

      const accessToken = this.accessTokenService.sign(accessTokenPayload, {
        subject: user.id.toString(),
      });

      const refreshToken = this.refreshTokenService.sign(refreshTokenPayload, {
        subject: user.id.toString(),
      });

      await this.tokenService.createOrUpdate(
        { token: refreshToken, userId: user.id },
        user,
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async register(dto: CreateUserDto): Promise<{ user: User; tokens: Tokens }> {
    try {
      const user = await this.usersService.create(dto);
      if (!user)
        throw new BadRequestException('An Error occured during creating user');

      const tokens = await this.getTokens(user);
      return { user, tokens };
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw e;
      }
      throw new InternalServerErrorException(`Cant register user`);
    }
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    id: number,
  ): Promise<User> {
    try {
      const token = this.tokenService.getByUserIdAndToken(id, refreshToken);
      return (await token).user;
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      throw new InternalServerErrorException(`Cant get user by token`);
    }
  }
}
