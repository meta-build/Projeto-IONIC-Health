import { LoadAllNotification, LoadNotificationById, RemoveNotification } from '@/domain/contracts/repos/notification';
import { Notification } from './entities/notification';
import DataSource from './data-source';

export class NotificationRepository implements LoadAllNotification, LoadNotificationById, RemoveNotification {
  async remove(id: number): Promise<void> {
    const notificationRepo = DataSource.getRepository(Notification);
    const notification = await notificationRepo.findOne({ where: { id } });

    if (notification) {
      await notificationRepo.remove(notification);
    }
  }

  async loadById(input: LoadNotificationById.Input): Promise<LoadNotificationById.Output> {
    const notificationRepo = DataSource.getRepository(Notification);
    const notification = await notificationRepo.findOne({ where: { id: input.id } });
  
    return notification;
  }

  async loadAll(): Promise<LoadAllNotification.Output> {
    try {
      const notificationRepo = DataSource.getRepository(Notification);
      const notifications = await notificationRepo.find();

      const output: LoadAllNotification.Output = notifications.map(notification => ({
        id: notification.id,
        userId: notification.userId,
        text: notification.text,
        createdAt: notification.createdAt
      }));

      return output;
    } catch (error) {
      throw new Error("Ocorreu um erro ao carregar todas as notificações.");
    }
  }
}
