import { SaveFile } from '../../domain/contracts'
import { FileData } from '../../domain/entities'

import path from 'path'
import fs from 'fs'

export class LocalFileStorage implements SaveFile {
  private readonly storagePath = path.join(__dirname, '../../../', 'uploads')
  type = 'local'

  async saveFile (fileData: FileData): Promise<string> {
    const { buffer, fileName } = fileData
    const filePath = path.join(this.storagePath, fileName)

    try {
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
    } catch (err) {
      console.error('Erro ao criar diretório:', err)
      throw err
    }

    await fs.promises.writeFile(filePath, buffer)

    return `/uploads/${fileName}`
  }
}
