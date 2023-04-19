import AppDataSource from '../../data-source'
import { SaveFile } from '../../domain/contracts'
import { User } from '../../entities/User'
import { Solicitacao } from '../../entities/Solicitacao'
import { Attachment } from '../../entities/Attachment'

import { Request, Response } from 'express'

export class CreateTicketController {
  constructor (
    private readonly fileStorage: SaveFile
  ) {}

  async handle (req: Request, res: Response): Promise<Response> {
    const { titulo, tipo, descricao } = req.body

    if (!titulo || !tipo) {
      return res.json({ error: 'O titulo e tipo são necessários' })
    }

    const { id } = res.locals
    const criador: any = await AppDataSource.manager
      .findOneByOrFail(User, { id })
      .catch((err) => {
        return res.json({ error: `Usuário com ID ${id} inválido` })
      })

    const { fileData } = req

    // In need of a transaction here

    const attachment = new Attachment()
    attachment.fileName = fileData.fileName
    attachment.fileType = fileData.mimeType
    attachment.storageType = this.fileStorage.type
    attachment.url = await this.fileStorage.saveFile(fileData)

    const ticket = new Solicitacao()
    ticket.criador = criador
    ticket.titulo = titulo
    ticket.tipo = tipo
    ticket.descricao = descricao
    ticket.attachments = [attachment]

    const savedTicket = await AppDataSource.manager.save(Solicitacao, ticket)

    attachment.ticketId = savedTicket.id

    await AppDataSource.manager.save(Attachment, attachment)

    return res.status(201).json(ticket)
  }
}
