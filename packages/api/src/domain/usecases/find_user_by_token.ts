import { UseCase } from '@codengage/domain'
import { User } from '../entities/user'

type Params = {
  accessToken: string
}

type Result = User

export type FindUserByToken = UseCase<Params, Result>
