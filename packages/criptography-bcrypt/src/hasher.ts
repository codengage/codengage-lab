import { Adapter } from '@codengage/domain'
import { HasherPort } from '@codengage/criptography'
import bcrypt from 'bcrypt'

export const bcryptHasherAdapter: Adapter<
  HasherPort,
  {
    salt: number
  }
> = ({ salt }) => async ({ plaintext }) => {
  const digest = await bcrypt.hash(plaintext, salt)
  return digest
}
