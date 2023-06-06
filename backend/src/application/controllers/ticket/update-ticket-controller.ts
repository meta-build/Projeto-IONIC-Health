import { HttpResponse, badRequest, forbidden, notFound, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { Validation } from '@/application/validation'
import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'
import { User, Notification } from '@/infra/repositories/mysql/entities'
import { UnauthorizedError } from '@/application/errors'
import { sendEmail } from '../mail/sendMail';
import AppDataSource from '@/infra/repositories/mysql/data-source'

type HttpRequest = {
  params: { id: number }
  requester: User
  title?: string
  description?: string
  status?: string
  isArchived?: boolean
  assignedRoleId?: number
}

export class UpdateTicketController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly ticketRepository: TicketRepository
  ) { }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest)

    
    if (error) {
      return badRequest(error)
    }
    
    if (httpRequest.status?.toUpperCase() === 'NEW') {
      const hasPermission = this.checkPermission(
        httpRequest.requester,
        'ApproveTicketToProd'
        )
        
      if (!hasPermission) {
        return forbidden(new UnauthorizedError())
      }

    }

    if (httpRequest.status?.toUpperCase() === 'RATING') {
      console.log(httpRequest.requester)
      const hasPermission = this.checkPermission(
        httpRequest.requester,
        'ApproveTicketToRating'
        )

        if (!hasPermission) {
          return forbidden(new UnauthorizedError())
      }

    }
    
    let archivedAt: Date
    let statusNewAt: Date
    let statusOnHoldingAt: Date
    let statusDoneAt: Date
    let statusRatingAt: Date
    
    if (httpRequest.isArchived === true) {
      archivedAt = new Date()
    } else if (httpRequest.isArchived === false) {
      archivedAt = null
    }

    const ticket = await this.ticketRepository.loadById(httpRequest.params)
    
    if (!ticket) {
      return notFound(new Error(`Ticket with id ${httpRequest.params.id} not found`))
    }

    let notifMessage = `Sua ${ticket.type} foi editada por ${httpRequest.requester.name}.${ticket.id}`;
    
    statusOnHoldingAt = ticket.statusOnHoldingAt
    statusNewAt = ticket.statusNewAt
    statusDoneAt = ticket.statusDoneAt
    
    switch (httpRequest.status.toUpperCase()) {
      case 'NEW':
        statusNewAt = new Date()
        statusOnHoldingAt = null
        statusDoneAt = null
        notifMessage = `Sua ${ticket.type} está em produção!.${ticket.id}`
        break
        case 'ONHOLDING':
        statusOnHoldingAt = new Date()
        statusDoneAt = null
        notifMessage = `Sua ${ticket.type} está em On Holding.${ticket.id}`
        break
      case 'DONE':
        statusDoneAt = new Date()
        notifMessage = `Sua ${ticket.type} foi concluída com status Done!.${ticket.id}`
        break
      case 'RATING':
        statusRatingAt = new Date()
        notifMessage = `Sua ${ticket.type} foi liberada para avaliação!.${ticket.id}`
      default:
        break
    }

    if(archivedAt !== null) {
      notifMessage = `Sua ${ticket.type} foi arquivada por ${httpRequest.requester.name}.${ticket.id}`;
    } else if (ticket.isArchived) {
      notifMessage = `Sua ${ticket.type} foi desarquivada por ${httpRequest.requester.name}.${ticket.id}`;
    }


    const updatedTicket = await this.ticketRepository.update({
      id: httpRequest.params.id,
      title: httpRequest.title,
      description: httpRequest.description,
      status: httpRequest.status,
      isArchived: httpRequest.isArchived,
      assignedRoleId: httpRequest.assignedRoleId,
      archivedAt: archivedAt,
      statusNewAt,
      statusOnHoldingAt,
      statusDoneAt,
      statusRatingAt
    });

    const notification = await this.createNotification(ticket.requester, notifMessage)

    // const recipient = notification.user.email;
    // await sendEmail(notification, recipient);

    return ok({ updatedTicket, notification })
  }

  private checkPermission = (user: User, permissionName: string): boolean => {
    if (user.role.isAdmin) {
      return true
    }

    return Boolean(user.role.permissions.find(
      (permission) => permission.permissionName === permissionName
    ))
  }

  private createNotification = async (user: User, message: string): Promise<Notification> => {
    const notification = new Notification()
    notification.user = user
    notification.text = message
    notification.id = notification.id;
    notification.userId = user.id;
    
    const savedNotification = await AppDataSource.manager.save(notification);

    return savedNotification;
  }
}
