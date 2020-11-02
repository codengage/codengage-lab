import { Either } from '@codengage/fp'
import { Failure } from '@codengage/domain'
import { User } from '../../domain/entities/user'

type Params = {
  name: string
  email: string
  password: string
}

type Result = User

export type DbCreateUserRepository = (params: Params) => Promise<Either<Failure, Result>>
