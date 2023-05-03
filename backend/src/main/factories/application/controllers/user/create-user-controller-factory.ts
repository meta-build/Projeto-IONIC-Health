import { Controller, CreateUserController } from '@/application/controllers'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'
import { makeCreateUserValidation } from './create-user-validation'

export const makeCreateUserController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userRepository = new UserRepository()
  return new CreateUserController(makeCreateUserValidation(), bcryptAdapter, userRepository)
}
