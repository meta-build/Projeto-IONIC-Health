import { Controller } from "../controller";
import { NotificationRepository } from "@/infra/repositories/mysql/notification-repository";
import { HttpResponse, notFound, badRequest, serverError, ok } from "@/application/helpers";

type HttpRequest = {
  params: any
}

export class DeleteNotificationController implements Controller {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;

      if (!id || isNaN(id)) {
        return badRequest(new Error("ID inválido"));
      }

      const notification = await this.notificationRepository.loadById(id);

      if (!notification) {
        return notFound(new Error(`Notification with ID ${id} not found`));
      }

      await this.notificationRepository.remove(id);

      return ok({ message: "Notification removed successfully" });
    } catch (error) {
      return serverError(new Error("Ocorreu um erro"));
    }
  }
}
