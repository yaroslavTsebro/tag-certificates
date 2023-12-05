import { HttpException, HttpStatus } from '@nestjs/common';

export class NoUserDataException extends HttpException {
  constructor(message?: string) {
    super(
      message || 'No user data received from OAuth provider',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
