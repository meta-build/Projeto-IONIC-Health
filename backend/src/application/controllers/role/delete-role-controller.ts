import { RoleRepository } from "@/infra/repositories/mysql/role-repository";
import { HttpResponse, ok} from '@/application/helpers'
import { Controller } from "../controller";

interface HttpRequest {
    params: { id: number }
  }

export class DeleteRoleController implements Controller {
    constructor(
        private readonly roleRepository: RoleRepository){}

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const role = await this.roleRepository.delete({ id: httpRequest.params.id })

        return ok(role)
        }
}