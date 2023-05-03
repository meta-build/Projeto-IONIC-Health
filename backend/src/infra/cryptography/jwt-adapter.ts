import { Encrypter } from '@/domain/contracts/cryptography'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: any): Promise<string> {
    const accessToken = jwt.sign(value, this.secret)
    return accessToken
  }
}
