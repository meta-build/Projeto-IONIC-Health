import { LoadAllNotification } from '@/domain/contracts/repos/notification';
import { Notification } from './entities/notification';
import { Ticket } from './entities';
import DataSource from './data-source';

export class Notify implements LoadAllNotification {
  loadAll: () => Promise<LoadAllNotification.Output>;

  async loadAllNotifications(): Promise<LoadAllNotification.Output> {
    const ticketRepo = DataSource.getRepository(Ticket);
    const ticket = new Ticket();
    ticket.requester = ticket.requester; // Preencha as informações do solicitante corretamente
    ticket.archivedAt = new Date(); // Usando archivedAt como o valor de createdAt

    // Criando um novo objeto Ticket
    // Preencher as propriedades do objeto Ticket como necessário
    const updatedTicket = await ticketRepo.save(ticket);

    // Criação da notificação
    const notificationRepo = DataSource.getRepository(Notification);
    const notification = new Notification();
    notification.text = `Nova solicitação criada por ${updatedTicket.requester.name} em ${updatedTicket.createdAt}`; // Inclua o nome do usuário na mensagem
    notification.userId = updatedTicket.requester.id;
    notification.createdAt = updatedTicket.archivedAt;
    notification.id = updatedTicket.id

    await notificationRepo.save(notification);

    const output: LoadAllNotification.Output = [{
      id: notification.id,
      userId: notification.userId,
      text: notification.text,
      createdAt: notification.createdAt
    }];

    return output;
  }
}
