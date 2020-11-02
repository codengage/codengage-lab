import { Either } from '@codengage/fp'
import { Failure } from '@codengage/domain'
import { User } from '../../domain/entities/user'

type Params = void

type Result = User[]

export type DbFindAllUsersRepository = (params: Params) => Promise<Either<Failure, Result>>
