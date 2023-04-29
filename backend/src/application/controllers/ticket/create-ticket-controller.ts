import { SaveFile } from '../../../domain/contracts'
import AppDataSource from '../../../infra/repositories/mysql/data-source'
import { Attachment, Ticket, User } from '../../../infra/repositories/mysql/entities'

import { Request, Response } from 'express'

export class CreateTicketController {
  constructor(private readonly fileStorage: SaveFile) { }

  async handle(req: Request, res: Response): Promise<Response> {
    const { titulo, tipo, descricao, status } = req.body

    if (!titulo || !tipo) {
      return res.json({ error: 'O titulo e tipo são necessários' })
    }

    const { id } = res.locals
    const criador: any = await AppDataSource.manager
      .findOneByOrFail(User, { id })
      .catch((err) => {
        return res.json({ error: err.message })
      })

    const fileDataList = req.fileDataList

    // In need of a transaction here

    const attachments: Attachment[] = []

    fileDataList?.forEach(async (fileData) => {
      const attachment = new Attachment()
      attachment.fileName = fileData.fileName
      attachment.mimeType = fileData.mimeType
      attachment.storageType = this.fileStorage.type
      attachment.url = await this.fileStorage.saveFile(fileData)
      attachments.push(attachment)
    })

    const ticket = new Ticket()
    ticket.requester = criador
    ticket.title = titulo
    ticket.type = tipo
    ticket.description = descricao
    ticket.attachments = attachments
    ticket.status = status

    const savedTicket = await AppDataSource.manager.save(Ticket, ticket)

    attachments?.forEach(async (attachment) => {
      attachment.ticketId = savedTicket.id
      await AppDataSource.manager.save(Attachment, attachment)
    })

    return res.status(201).json(ticket)
  }
}
