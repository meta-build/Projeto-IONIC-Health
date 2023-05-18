import { LocalFileStorage } from '@/infra/storage'

export const makeLocalFileStorage = (): LocalFileStorage => {
  return new LocalFileStorage()
}
