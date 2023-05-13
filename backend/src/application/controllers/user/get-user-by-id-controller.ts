import { Controller } from '@/application/controllers'
import { NotFound } from '@/application/errors'
import { HttpResponse, notFound, ok } from '@/application/helpers'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'

type HttpRequest = {
  params: any
}

export class GetUserByIdController implements Controller {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = httpRequest.params.id
    const user = await this.userRepository.loadById({ id })

    if (!user) {
      return notFound(new NotFound())
    }

    return ok(user)
  }
}
