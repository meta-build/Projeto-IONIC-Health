import { Controller, DeleteNotificationController, GetAllNotificationsController, GetNotificationByIdController } from '@/application/controllers';
import { NotificationRepository } from '@/infra/repositories/mysql/notification-repository';

export const makeDeleteNotificationController = (): Controller => {
  const notificationRepository = new NotificationRepository();
  return new DeleteNotificationController(notificationRepository)
}

export const makeGetAllNotificationsController = (): Controller => {
  const notificationRepository = new NotificationRepository();
  return new GetAllNotificationsController(notificationRepository)
}

export const makeGetNotificationByIdController = (): Controller => {
  const notificationRepository = new NotificationRepository();
  return new GetNotificationByIdController(notificationRepository)
}
