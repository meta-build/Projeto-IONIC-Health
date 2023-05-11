import {
  CreateUser,
  LoadUserByEmail,
  LoadUserById
} from '@/domain/contracts/repos/user'
import { User } from './entities'
import DataSource from './data-source'

import { ObjectType, Repository } from 'typeorm'

export class UserRepository
  implements CreateUser, LoadUserByEmail, LoadUserById
{
  getRepository(entity: ObjectType<User>): Repository<User> {
    return DataSource.getRepository(entity)
  }

  async create({
    name,
    email,
    password,
    roleId
  }: CreateUser.Input): Promise<CreateUser.Output> {
    const userRepo = this.getRepository(User)
    const user = userRepo.create({
      name,
      email,
      password,
      roleId
    })

    await userRepo.save(user)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roleId: user.roleId
    }
  }

  async loadByEmail({
    email
  }: LoadUserByEmail.Input): Promise<LoadUserByEmail.Output> {
    const userRepo = this.getRepository(User)

    const user = await userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('user.email = :email', { email })
      .getOne()

    if (user) {
      return user
    }

    return null
  }

  async loadById({ id }: LoadUserById.Input): Promise<LoadUserById.Output> {
    const userRepo = this.getRepository(User)

    const user = await userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where('user.id = :id', { id })
      .getOne()

    if (user) {
      return user
    }

    return null
  }
}
