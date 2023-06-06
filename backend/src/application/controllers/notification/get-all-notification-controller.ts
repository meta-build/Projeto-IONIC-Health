import { Controller } from "../controller";
import { NotificationRepository } from "@/infra/repositories/mysql/notification-repository";
import { HttpResponse, ok, serverError } from "@/application/helpers";

interface HttpRequest {
  params: {id: number}
}

export class GetAllNotificationsByUserIdController implements Controller {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const notifications = await this.notificationRepository.loadAllByUserId({id: httpRequest.params.id});
      return ok(notifications);
    } catch (error) {
      return serverError(new Error("Ocorreu um erro"));
    }
  }
}
