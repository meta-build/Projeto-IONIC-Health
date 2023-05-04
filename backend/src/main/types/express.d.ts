declare module Express {
  interface Request {
    locals?: any
    fileDataList?: Array<{
      buffer: Buffer,
      fileName: string,
      mimeType: string
    }>
  }
}
