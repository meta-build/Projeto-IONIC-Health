import { Controller } from "../controller";
import { NotificationRepository } from "@/infra/repositories/mysql/notification-repository";
import { HttpResponse, ok, serverError } from "@/application/helpers";

export class GetAllNotificationsController implements Controller {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async handle(): Promise<HttpResponse> {
    try {
      const notifications = await this.notificationRepository.loadAll();
      return ok(notifications);
    } catch (error) {
      return serverError(new Error("Ocorreu um erro"));
    }
  }
}
