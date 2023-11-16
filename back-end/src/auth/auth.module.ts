import { Module } from '@nestjs/common';
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TokenModule, UserModule]
})
export class AuthModule {}
