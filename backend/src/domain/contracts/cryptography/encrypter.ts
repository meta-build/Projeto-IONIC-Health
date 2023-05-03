export interface Encrypter {
  encrypt: (value: any) => Promise<string>
}
