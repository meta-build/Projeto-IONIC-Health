import { Controller, DeleteNotificationController, GetAllNotificationsByUserIdController, GetNotificationByIdController } from '@/application/controllers';
import { NotificationRepository } from '@/infra/repositories/mysql/notification-repository';

export const makeDeleteNotificationController = (): Controller => {
  const notificationRepository = new NotificationRepository();
  return new DeleteNotificationController(notificationRepository)
}

export const makeGetAllByUserIdNotificationsController = (): Controller => {
  const notificationRepository = new NotificationRepository();
  return new GetAllNotificationsByUserIdController(notificationRepository)
}

export const makeGetNotificationByIdController = (): Controller => {
  const notificationRepository = new NotificationRepository();
  return new GetNotificationByIdController(notificationRepository)
}
