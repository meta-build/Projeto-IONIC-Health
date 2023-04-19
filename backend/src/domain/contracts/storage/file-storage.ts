import { FileData } from '../../entities'

export interface SaveFile {
  saveFile: (file: FileData ) => Promise<string>
}

export interface DeleteFile {
  deleteFile: (fileUrl: string) => Promise<void>
}
