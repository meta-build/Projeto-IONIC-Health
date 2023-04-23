import { LocalFileStorage } from '../../../../infra/storage/local-file-storage';

export const makeLocalFileStorage = (): LocalFileStorage => {
  return new LocalFileStorage()
}
