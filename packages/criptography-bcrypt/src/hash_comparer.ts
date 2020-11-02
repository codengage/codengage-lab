import { Adapter } from '@codengage/domain'
import { HashComparerPort } from '@codengage/criptography'
import bcrypt from 'bcrypt'

export const bcryptHashComparerAdapter: Adapter<HashComparerPort, void> = () => async ({ plaintext, digest }) => {
  const isValid = await bcrypt.compare(plaintext, digest)
  return isValid
}
