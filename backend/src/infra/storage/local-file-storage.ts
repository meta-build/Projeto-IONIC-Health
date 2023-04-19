import { SaveFile } from '../../domain/contracts'
import { FileData } from '../../domain/entities'

import path from 'path'
import fs from 'fs'

export class LocalFileStorage implements SaveFile {
  private readonly storagePath = path.join('../../', 'uploads')

  async saveFile (fileData: FileData): Promise<string> {
    const { buffer, fileName } = fileData

    const filePath = path.join(this.storagePath, fileName)

    await fs.promises.writeFile(filePath, buffer)

    return filePath
  }
}
