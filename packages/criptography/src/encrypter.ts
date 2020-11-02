import { Port } from '@codengage/domain'

export type EncrypterPort = Port<
  {
    plaintext: string
  },
  Promise<string>
>
