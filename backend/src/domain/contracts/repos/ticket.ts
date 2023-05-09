export interface CreateTicket {
    create: (input: CreateTicket.Input) => Promise<CreateTicket.Output>
  }
  
  export namespace CreateTicket {
    export type Input = {
      title: string
      type: string
      description: string
      status: string
    }
    export type Output = {
      id: number
      title: string
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
    }
  }