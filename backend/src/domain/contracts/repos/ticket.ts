export interface LoadTicketByReqId {
  loadTicketById: (
    input: LoadTicketByReqId.Input
  ) => Promise<LoadTicketByReqId.Output>
}

export namespace LoadTicketByReqId {
  export type Input = {
    id: number
  }
  export type Output = {
    id: number
    title: string
    type: string
    description: string
  }
}
