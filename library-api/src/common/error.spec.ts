import { NotFoundError, BadRequestError } from './errors';

describe('NotFoundError', () => {
  it('should create a NotFoundError with the provided message', () => {
    const errorMessage = 'Resource not found';
    const error = new NotFoundError(errorMessage);
    expect(error.message).toBe(`${errorMessage} was not found.`);
    expect(error.getStatus()).toBe(404);
  });
});

describe('BadRequestError', () => {
  it('should create a BadRequestError with the provided message', () => {
    const errorMessage = 'Invalid request';
    const error = new BadRequestError(errorMessage);
    expect(error.message).toBe(`${errorMessage} not possible.`);
    expect(error.getStatus()).toBe(400);
  });
});
