import { LoadAllByUserId, LoadNotificationById, RemoveNotification } from '@/domain/contracts/repos/notification';
import { Notification } from './entities/notification';
import DataSource from './data-source';

export class NotificationRepository implements RemoveNotification, LoadAllByUserId {
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

  async loadAllByUserId(input: LoadAllByUserId.Input): Promise<LoadAllByUserId.Output> {
    try {
      const notificationRepo = DataSource.getRepository(Notification);
      const notifications = await notificationRepo 
      .find({
        where: {userId: input.id}
      });

      const output: LoadAllByUserId.Output = notifications.map(notification => ({
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
