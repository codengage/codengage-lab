import { UseCase } from '@codengage/domain'
import { Auth } from '../entities/auth'

type Params = {
  email: string
  password: string
}

type Result = Auth

export type SignIn = UseCase<Params, Result>
