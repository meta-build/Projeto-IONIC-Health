import { Attachment } from '@/infra/repositories/mysql/entities/attachment'
import { Rating } from '@/infra/repositories/mysql/entities/rating'

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
