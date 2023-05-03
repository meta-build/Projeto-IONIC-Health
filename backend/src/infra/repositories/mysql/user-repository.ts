import { DbCreateUser } from '@/domain/contracts/repos/user'
import { User } from './entities'
import DataSource from './data-source'

import { ObjectType, Repository } from 'typeorm'

export class UserRepository implements DbCreateUser {
  getRepository (entity: ObjectType<User>): Repository<User> {
    return DataSource.getRepository(entity)
  }

  async create ({ name, email, password, roleId }: DbCreateUser.Input): Promise<DbCreateUser.Output> {
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
}
