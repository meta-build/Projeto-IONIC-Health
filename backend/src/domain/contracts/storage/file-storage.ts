import { FileData } from '../../entities'

export interface SaveFile {
  type: any
  saveFile: (file: FileData ) => Promise<string>
}

export interface DeleteFile {
  type: any
  deleteFile: (fileUrl: string) => Promise<void>
}
