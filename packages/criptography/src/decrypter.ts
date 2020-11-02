import { Port } from '@codengage/domain'

export type DecrypterPort = Port<
  {
    ciphertext: string
  },
  Promise<string>
>
