import { Either } from '@codengage/fp'
import { Failure } from '@codengage/domain'
import { User } from '../../domain/entities/user'

type Params = {
  email: string
}

type Result = User

export type DbFindUserByEmailRepository = (params: Params) => Promise<Either<Failure, Result>>
