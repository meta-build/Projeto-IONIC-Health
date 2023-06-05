import { Controller } from '@/application/controllers';
import { Validation } from '@/application/validation';
import { HttpResponse, badRequest, ok } from '@/application/helpers';
import { UnprocessableEntity } from '@/application/errors';
import { RatingRepository } from '@/infra/repositories/mysql/rating-repository';
import { UserRepository } from '@/infra/repositories/mysql/user-repository';
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository';
import { Notification } from '@/infra/repositories/mysql/entities';
import AppDataSource from '@/infra/repositories/mysql/data-source';
import { sendEmail } from '../mail/sendMail';

type HttpRequest = {
  requesterId: number;
  value: number;
  committee: string;
  comment: string;
  ticketId: number;
};

export class CreateRatingController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly userRepository: UserRepository,
    private readonly ratingRepository: RatingRepository,
    private readonly ticketRepository: TicketRepository
  ) {}

  async handle(req: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(req);

    if (error) {
      return badRequest(error);
    }

    const { requesterId, value, committee, comment, ticketId } = req;

    const reviewer = await this.userRepository.loadById({ id: requesterId });

    if (!reviewer) {
      return badRequest(new UnprocessableEntity());
    }

    const ticket = await this.ticketRepository.loadById({ id: ticketId });

    if (!ticket) {
      return badRequest(new UnprocessableEntity());
    }
    
    const ticketCreator = await this.userRepository.loadById({ id: ticket.requester.id });
    
    if (!ticketCreator) {
      return badRequest(new UnprocessableEntity());
    }
    
    const ticketCreatorEmail = ticketCreator.email;

    const rating = await this.ratingRepository.create({
      comment,
      committee,
      value,
      ticketId,
      requesterId,
    });

    const notification = await this.createNotification(reviewer, rating, ticket, "Nova avaliação criada");

    const recipient = [notification.user.email, ticketCreatorEmail];

    await sendEmail(notification, recipient);

    return ok({rating, notification});
  }

  private async createNotification(
    reviewer: any,
    rating: any,
    ticket: any,
    message: string
  ): Promise<Notification> {
    const notification = new Notification();
    notification.user = reviewer;
    notification.text = `${message} por ${reviewer.name} em ${new Date().toISOString()}`;
    notification.id = notification.id;
    notification.userId = notification.userId;
    notification.rating = rating;
    notification.ticket = ticket;

    const savedNotification = await AppDataSource.manager.save(notification);

    return savedNotification;
  }
}
