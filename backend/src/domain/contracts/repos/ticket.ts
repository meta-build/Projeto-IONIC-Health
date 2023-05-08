export interface CreateTicket {
    create: (input: CreateTicket.Input) => Promise<CreateTicket.Output>
  }
  
export namespace CreateTicket {
    export type Input = {
        title: string,
        type: string,
        description: string
    }
    export type Output = {
        id: number,
        title: string,
        type: string,
        description: string
    }
}

export interface LoadTicketByReqId {
    loadTicketById: (input: LoadTicketByReqId.Input) => Promise<LoadTicketByReqId.Output>
}
    
export namespace LoadTicketByReqId {
    export type Input = {
        id: number
    }
    export type Output = {
        id: number,
        title: string,
        type: string,
        description: string
    }
}