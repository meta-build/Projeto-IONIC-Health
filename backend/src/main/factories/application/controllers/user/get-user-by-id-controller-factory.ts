import { Controller, GetUserByIdController } from '@/application/controllers'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'

export const makeGetUserByIdController = (): Controller => {
  const userRepository = new UserRepository()
  return new GetUserByIdController(userRepository)
}
