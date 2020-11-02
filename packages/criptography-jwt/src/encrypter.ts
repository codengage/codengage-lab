import { Adapter } from '@codengage/domain'
import { EncrypterPort } from '@codengage/criptography'
import jwt from 'jsonwebtoken'

type Ports = {
  secret: string
}

export const jwtEncrypterAdapter: Adapter<EncrypterPort, Ports> = ({ secret }) => async ({ plaintext }) => {
  const ciphertext = await jwt.sign({ id: plaintext }, secret)
  return ciphertext
}
