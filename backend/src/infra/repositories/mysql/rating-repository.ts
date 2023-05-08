import { Rating } from './entities'
import DataSource from './data-source'
import { CreateRating, LoadRatingByReqId } from '@/domain/contracts/repos/rating'
  
import { ObjectType, Repository } from 'typeorm'

  
export class RatingRepository
    implements CreateRating, LoadRatingByReqId
{
getRepository(entity: ObjectType<Rating>): Repository<Rating> {
    return DataSource.getRepository(entity)
}

async create({
    requesterId,
    value,
    committee,
    comment,
    ticketId
}: CreateRating.Input): Promise<CreateRating.Output> {
    const ratingRepo = this.getRepository(Rating)
    const rating = ratingRepo.create({
        userId: requesterId,
        value,
        committee,
        comment,
        ticketId
    })

    await ratingRepo.save(rating)

    return {
        id: rating.id,
        requesterId: rating.requesterId,
        value: rating.value,
        committee: rating.committee,
        comment: rating.comment,
        ticketId: rating.ticketId
    }
}
async loadByReqId({ requesterId }: LoadRatingByReqId.Input): Promise<LoadRatingByReqId.Output> {
    const ratingRepo = this.getRepository(Rating)

    const rating = await ratingRepo.findOneBy({ requesterId })

    if (rating) {
        return rating
    }

    return null
    }
}
