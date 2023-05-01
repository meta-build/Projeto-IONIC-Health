import { makeCreateTicketValidation } from './create-ticket-validation'
import { Controller, CreateTicketController } from '@/application/controllers'
import { makeLocalFileStorage } from '@/main/factories/infra/storage'

export const makeTicketController = (): Controller => {
  return new CreateTicketController(makeCreateTicketValidation(), makeLocalFileStorage())
}
