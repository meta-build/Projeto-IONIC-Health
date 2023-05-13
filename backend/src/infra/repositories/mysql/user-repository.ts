import {
  CreateUser,
  LoadAllUser,
  LoadUserByEmail,
  LoadUserById,
  UpdateUser
} from '@/domain/contracts/repos/user'
import { User } from './entities'
import DataSource from './data-source'

import { ObjectType, Repository } from 'typeorm'

export class UserRepository
  implements CreateUser, LoadUserByEmail, LoadUserById, UpdateUser, LoadAllUser
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

    const user = await userRepo.findOne({ where: { email } })

    if (user) {
      return user
    }

    return null
  }

  async loadById({ id }: LoadUserById.Input): Promise<LoadUserById.Output> {
    const userRepo = this.getRepository(User)

    const user = await userRepo
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne()

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId
    }
  }

  async loadAll(): Promise<LoadAllUser.Output> {
    const userRepo = this.getRepository(User)

    const users = await userRepo.createQueryBuilder('user').getMany()

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      roleId: user.roleId
    }))
  }

  async update({
    id,
    email,
    roleId,
    name
  }: UpdateUser.Input): Promise<UpdateUser.Output> {
    const userRepo = this.getRepository(User)

    const user = await userRepo.findOneBy({ id })

    if (!user) {
      return null
    }

    ;(user.email = email ?? user.email),
      (user.name = name ?? user.name),
      (user.roleId = roleId ?? user.roleId)

    const updatedUser = await userRepo.save(user)

    return updatedUser
  }
}
