import { Attachment } from '@/infra/repositories/mysql/entities/attachment'
import { Rating } from '@/infra/repositories/mysql/entities/rating'

export interface UpdateTicket {
  update: (input: UpdateTicket.Input) => Promise<UpdateTicket.Output>
}

export namespace UpdateTicket {
  export type Input = {
    id: number,
    title?: string,
    description?: string,
    status?: string,
    updatedAt?: Date,
    archivedAt?: Date
  }
  export type Output = {
    id: number
    title: string
    requesterId: number
    type: string
    description: string
    status: string
  }
}

export interface LoadTicketById {
  loadById: (input: LoadTicketById.Input) => Promise<LoadTicketById.Output>
}

export namespace LoadTicketById {
  export type Input = {
    id: number
  }
  export type Output = {
    id: number
    title: string
    type: string
    description: string
    status: string
    ratings: Rating[]
    attachments: Attachment[]
  }
}

export interface LoadAllTicket {
  loadAll: () => Promise<LoadAllTicket.Output>
}

export namespace LoadAllTicket {
  export type Output = Array<{
    id: number
    title: string
    type: string
    description: string
    status: string
    ratings: Rating[]
    attachments: Attachment[]
  }>
}
