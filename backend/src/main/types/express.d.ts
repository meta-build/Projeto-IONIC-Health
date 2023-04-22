declare module Express {
  interface Request {
    fileDataList?: Array<{
      buffer: Buffer,
      fileName: string,
      mimeType: string
    }>
  }
}
