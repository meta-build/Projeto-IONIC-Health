import { Middleware } from '@/application/middlewares';
import { UserRepository } from '@/infra/repositories/mysql/user-repository';
import { AuthMiddleware } from '@/main/middlewares/authentication';

export const makeAuthMiddleware = (): Middleware => {
  const userRepository = new UserRepository()
  return new AuthMiddleware(userRepository)
}
