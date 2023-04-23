import { CreateTicketController } from '../../../../../application/controllers'
import { makeLocalFileStorage } from '../../../infra/storage'

export const makeTicketController = (): CreateTicketController => {
  return new CreateTicketController(makeLocalFileStorage())
}
