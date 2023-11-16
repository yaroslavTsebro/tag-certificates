import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import User from 'src/auth/user/entity/user.entity';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);

function getCurrentUserByContext(context: ExecutionContext): User {
  return context.switchToHttp().getRequest().user;
}
