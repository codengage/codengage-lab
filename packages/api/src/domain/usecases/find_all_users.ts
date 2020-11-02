import { UseCase } from '@codengage/domain'
import { User } from '../entities/user'

type Params = void

type Result = User[]

export type FindAllUsers = UseCase<Params, Result>
