export interface LoadAllNotification {
  loadAll: () => Promise<LoadAllNotification.Output>
}

export namespace LoadAllNotification {
  export type Output = {
    id: number
    userId: number
    text: string
    createdAt: Date
  }[]
}