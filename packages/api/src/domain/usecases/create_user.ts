import { UseCase } from '@codengage/domain'
import { User } from '../entities/user'

type Params = {
  name: string
  email: string
  password: string
}

type Result = User

export type CreateUser = UseCase<Params, Result>
