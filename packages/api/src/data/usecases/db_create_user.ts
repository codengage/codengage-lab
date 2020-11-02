import { Failure, UseCaseFactory } from '@codengage/domain'
import { HasherPort } from '@codengage/criptography'
import { always, left } from '@codengage/fp'
import { DbCreateUserRepository } from '../repositories/db_create_user_repository'
import { DbFindUserByEmailRepository } from '../repositories/db_find_user_by_email_repository'
import { CreateUser } from '../../domain/usecases/create_user'

type Ports = {
  hasher: HasherPort
  createUserRepository: DbCreateUserRepository
  findUserByEmailRepository: DbFindUserByEmailRepository
}

export const dbCreateUser: UseCaseFactory<Ports, CreateUser> = ports => async params => {
  const userExistsEither = await ports.findUserByEmailRepository({ email: params.email })
  const userExists = userExistsEither.fold(always(false), always(true))

  if (userExists) {
    return left(new Failure('user email must be unique'))
  }

  const hashPassword = await ports.hasher({ plaintext: params.password })

  const user = await ports.createUserRepository({
    name: params.name,
    email: params.email,
    password: hashPassword,
  })

  return user
}
