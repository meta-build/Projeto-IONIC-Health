import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { Hasher } from '@/domain/contracts/cryptography'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'

type HttpRequest = {
  name: string
  email: string
  password: string
  roleId: number
}

export class CreateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly hasher: Hasher,
    private readonly userRepository: UserRepository
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(req)

    if (error) {
      return badRequest(error)
    }

    // create a logic to check if user already exists

    // if user doesn't exist execute the following

    const hashedPassword = await this.hasher.hash(req.password)
    const createdUser = await this.userRepository.create(
      // creates an empy object, insert req values and overwrite password with hashedPassword
      Object.assign({}, req, { password: hashedPassword })
    )

    return ok(createdUser)
  }
}
