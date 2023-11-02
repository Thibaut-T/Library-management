import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor(message: string) {
    super(`${message} was not found.`, HttpStatus.NOT_FOUND);
  }
}

export class BadRequestError extends HttpException {
  constructor(message: string) {
    super(`${message} not possible.`, HttpStatus.BAD_REQUEST);
  }
}
