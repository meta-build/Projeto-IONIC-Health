import { Controller, LoginController } from '@/application/controllers'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'
import { makeLoginValidation } from './login-validation-factory'
import env from '@/main/config/env'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userRepository = new UserRepository()
  return new LoginController(makeLoginValidation(), bcryptAdapter, jwtAdapter, userRepository)
}
