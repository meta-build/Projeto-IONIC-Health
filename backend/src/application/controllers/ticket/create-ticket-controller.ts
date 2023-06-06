import { HttpResponse, badRequest, ok } from '@/application/helpers';
import { Controller } from '@/application/controllers';
import { Validation } from '@/application/validation';
import { SaveFile } from '@/domain/contracts';
import { Attachment, Ticket, User, Notification } from '@/infra/repositories/mysql/entities';
import AppDataSource from '@/infra/repositories/mysql/data-source';
import { sendEmail } from '../mail/sendMail';

type HttpRequest = {
  requesterId: number;
  title: string;
  type: string;
  description: string;
  fileDataList?: Array<{
    buffer: Buffer;
    fileName: string;
    mimeType: string;
  }>;
};

export class CreateTicketController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly fileStorage: SaveFile
  ) {}

  async handle(httpRequest?: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest);

    if (error) {
      return badRequest(error);
    }

    const { requesterId, title, type, description, fileDataList } = httpRequest;

    const requester: any = await AppDataSource.manager.findOneByOrFail(User, { id: requesterId });

    const attachments: Attachment[] = [];

    for (const fileData of fileDataList) {
      const attachment = new Attachment();
      attachment.fileName = fileData.fileName;
      attachment.mimeType = fileData.mimeType;
      attachment.storageType = this.fileStorage.type;
      attachment.url = await this.fileStorage.saveFile(fileData);
      attachments.push(attachment);
    }

    const ticket = new Ticket();
    ticket.requester = requester;
    ticket.title = title;
    ticket.type = type.toUpperCase();
    ticket.description = description;
    ticket.attachments = attachments;
    ticket.status = 'RECENT';

    const savedTicket = await AppDataSource.manager.save(Ticket, ticket);

    attachments?.forEach(async (attachment) => {
      attachment.ticketId = savedTicket.id
      await AppDataSource.manager.save(Attachment, attachment)
    })

    return ok({
      id: ticket.id,
      title: ticket.title,
      type: ticket.type,
      description: ticket.description,
      status: ticket.status,
      isArchived: ticket.isArchived,
      attachments: ticket.attachments,
      assignedRoleId: ticket.assignedRoleId,
      requester: {
        id: requester.id,
        name: requester.name,
        email: requester.email,
        roleId: requester.roleId,
      },
      createdAt: ticket.createdAt,
      updatedAt: ticket.updatedAt,
      archivedAt: ticket.archivedAt,
    })
  }
}
