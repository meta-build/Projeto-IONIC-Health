import { Controller, GetAllUserController } from '@/application/controllers'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'

export const makeGetAllUserController = (): Controller => {
  const userRepository = new UserRepository()
  return new GetAllUserController(userRepository)
}
