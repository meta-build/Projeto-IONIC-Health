import { TicketRepository } from '@/infra/repositories/mysql/ticket-repository'
import { Controller } from '@/application/controllers'
import { HttpResponse, badRequest, noContent } from '@/application/helpers'
import { DeleteFile } from '@/domain/contracts'

type HttpRequest = {
  params: any
}

export class DeleteTicketByIdController implements Controller {
  constructor(
    private readonly ticketRepository: TicketRepository,
    private readonly fileStorage: DeleteFile
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const id = httpRequest.params.id
    const ticket = await this.ticketRepository.loadById({ id })

    if (!ticket) {
      return badRequest(new Error())
    }

    for (let attachment of ticket.attachments ) {
      this.fileStorage.deleteFile(attachment.url)
    }

    await this.ticketRepository.deleteById({ id: ticket.id })

    return noContent()
  }
}
