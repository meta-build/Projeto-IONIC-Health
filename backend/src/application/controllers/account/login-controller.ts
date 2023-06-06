import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { HttpResponse, badRequest, forbidden, ok } from '@/application/helpers'
import { Encrypter, HashComparer } from '@/domain/contracts/cryptography'
import { UserRepository } from '@/infra/repositories/mysql/user-repository'
import { AuthenticationError } from '@/application/errors/http'

type HttpRequest = {
  email: string
  password: string
}

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly userRepository: UserRepository
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(req)

    if (error) {
      return badRequest(error)
    }

    const { email, password } = req

    const user = await this.userRepository.loadByEmail({ email })

    if (user?.isActive) {
      const isValid = await this.hashComparer.compare(password, user.password)

      let permissions = []

      if (user.role?.permissions?.length) {
        permissions = user.role.permissions
      }

      if (user.permissions?.length) {
        permissions = user.permissions
      }

      if (isValid) {
        const accessToken = await this.encrypter.encrypt({ id: user.id })
        return ok({
          id: user.id,
          accessToken,
          name: user.name,
          role: user.role,
          permissions
        })
      }
    }

    return forbidden(new AuthenticationError())
  }
}
