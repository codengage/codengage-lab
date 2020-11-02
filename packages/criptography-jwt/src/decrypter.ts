import { Adapter } from '@codengage/domain'
import { DecrypterPort } from '@codengage/criptography'
import jwt from 'jsonwebtoken'

type Ports = {
  secret: string
}

export const jwtDecrypterAdapter: Adapter<DecrypterPort, Ports> = ({ secret }) => async ({ ciphertext }) => {
  const plaintext: any = await jwt.verify(ciphertext, secret)
  return plaintext.id || plaintext
}
