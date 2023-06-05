import { Controller } from '@/application/controllers'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'
import { UpdateUserController } from '@/application/controllers/user/update-user-controller'
import { makeUpdateUserValidation } from './update-user-validation'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { PermissionRepository } from '@/infra/repositories/mysql/permission-repository'

export const makeUpdateUserController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userRepository = new UserRepository()
  const permissionRepository = new PermissionRepository()
  return new UpdateUserController(
    makeUpdateUserValidation(),
    bcryptAdapter,
    userRepository,
    permissionRepository
  )
}
