import AppDataSource from '../../../data-source'
import { User, Rating, Solicitacao } from '../../../entities'
import { Validation } from '../../validation/validation'

import { Request, Response } from 'express'

export class CreateRatingController {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const error = this.validation.validate(req.body)

    if (error) {
      return res.status(400).json(error.message)
    }

    const { value, committee, comment, ticketId } = req.body

    const { id } = res.locals
    const reviewer: any = await AppDataSource.manager
      .findOneByOrFail(User, { id })
      .catch((err) => {
        return res.json({ error: err.message })
      })

    const ticket: any = await AppDataSource.manager
      .findOneByOrFail(Solicitacao, { id: ticketId })
      .catch((err) => {
        return res.json({ error: err.message })
      })

    const rating = new Rating()
    rating.comment = comment
    rating.committee = committee
    rating.value = value
    rating.ticket = ticket
    rating.user = reviewer

    await AppDataSource.manager.save(Rating, rating)

    return res.status(201).json(rating)
  }
}
