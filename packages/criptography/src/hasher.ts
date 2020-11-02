import { Port } from '@codengage/domain'

export type HasherPort = Port<
  {
    plaintext: string
  },
  Promise<string>
>
