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
export interface LoadNotificationById {
  loadById: (input: LoadNotificationById.Input) => Promise<LoadNotificationById.Output>
}

export namespace LoadNotificationById {
  export type Input = {
    id: number
  }
  export type Output = {
    id: number
    userId: number
    text: string
    createdAt: Date
  }
}

export interface RemoveNotification {
  remove: (id: number) => Promise<void>;
}

export interface LoadAllByUserId {
  loadAllByUserId: (id: LoadAllByUserId.Input) => Promise<LoadAllByUserId.Output>;
}

export namespace LoadAllByUserId {
  export type Input = {
    id: number
  }
  export type Output = Array<{
    id: number
    userId: number
    text: string
    createdAt: Date
  }>
}
