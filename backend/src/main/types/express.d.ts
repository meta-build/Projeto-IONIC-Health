declare module Express {
  interface Request {
    fileData?: {
      buffer: Buffer,
      fileName: string,
      mimeType: string
    } | {}
  }
}
