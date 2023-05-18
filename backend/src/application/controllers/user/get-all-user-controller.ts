import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'

export class GetAllUserController implements Controller {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(): Promise<HttpResponse> {
    const users = await this.userRepository.loadAll()

    return ok(users)
  }
}
