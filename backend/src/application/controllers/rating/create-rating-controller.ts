import { Controller } from '@/application/controllers';
import { Validation } from '@/application/validation';
import { HttpResponse, badRequest, ok } from '@/application/helpers';
import { UnprocessableEntity } from '@/application/errors';
import { RatingRepository } from '@/infra/repositories/mysql/rating-repository';
import { UserRepository } from '@/infra/repositories/mysql/user-repository';
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository';
import { Notification } from '@/infra/repositories/mysql/entities';
import AppDataSource from '@/infra/repositories/mysql/data-source';

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

    const rating = await this.ratingRepository.create({
      comment,
      committee,
      value,
      ticketId,
      requesterId,
    });

    const notification = await this.createNotification(ticketCreator, rating, ticket, `${reviewer.name} avaliou sua ${ticket.type}.${ticket.id}`);

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
    notification.text = message;
    notification.id = notification.id;
    notification.userId = reviewer.id;
    notification.rating = rating;
    notification.ticket = ticket;

    const savedNotification = await AppDataSource.manager.save(notification);

    return savedNotification;
  }
}
