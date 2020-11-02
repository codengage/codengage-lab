import { Port } from '@codengage/domain'

export type HashComparerPort = Port<
  {
    digest: string
    plaintext: string
  },
  Promise<boolean>
>
