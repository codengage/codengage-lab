import { Either } from '@codengage/fp'
import { Failure } from '@codengage/domain'
import { User } from '../../domain/entities/user'

type Params = {
  id: string
}

type Result = User

export type DbFindUserByIdRepository = (params: Params) => Promise<Either<Failure, Result>>
