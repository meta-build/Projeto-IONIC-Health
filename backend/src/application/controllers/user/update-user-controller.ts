import { Controller } from "@/application/controllers";
import { Validation } from "@/application/validation";
import { HttpResponse, badRequest, ok } from "@/application/helpers";
import { UserRepository } from "@/infra/repositories/mysql/user-repository";

type HttpRequest = {
  param: { id: number };
  name: string;
  email: string;
  roleId: number;
};

export class UpdateUserController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly userRepository: UserRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest);

    if (error) {
      return badRequest(error);
    }

    const user = await this.userRepository.update({
      id: httpRequest.param.id,
      name: httpRequest.name,
      email: httpRequest.email,
      roleId: httpRequest.roleId,
    });
    return ok(user);
  }
}
