import { FileData } from '../../entities'

export interface UploadFile {
  uploadFile: (file: FileData ) => Promise<string>
}

export interface DeleteFile {
  deleteFile: (fileUrl: string) => Promise<void>
}
