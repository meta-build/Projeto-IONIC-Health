export interface CreateRating {
    create: (input: CreateRating.Input) => Promise<CreateRating.Output>
  }
  
export namespace CreateRating {
    export type Input = {
        requesterId: number,
        value: number,
        committee: string,
        comment: string,
        ticketId: number
    }
    export type Output = {
        id: number,
        requesterId: number,
        value: number,
        committee: string,
        comment: string,
        ticketId: number
    }
}
export interface LoadRatingByReqId {
    loadByReqId: (input: LoadRatingByReqId.Input) => Promise<LoadRatingByReqId.Output>
}
    
export namespace LoadRatingByReqId {
    export type Input = {
        requesterId: number
    }
    export type Output = {
        id: number,
        requesterId: number,
        value: number,
        committee: string,
        comment: string,
        ticketId: number
    }
}