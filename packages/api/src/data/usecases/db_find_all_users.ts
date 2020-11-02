import { always, identity, right } from '@codengage/fp'
import { UseCaseFactory } from '@codengage/domain'
import { FindAllUsers } from '../../domain/usecases/find_all_users'
import { DbFindAllUsersRepository } from '../repositories/db_find_all_users_repository'

type Ports = {
  findAllUsersRepository: DbFindAllUsersRepository
}

export const dbFindAllUsers: UseCaseFactory<Ports, FindAllUsers> = ports => async () => {
  const usersEither = await ports.findAllUsersRepository()
  const users = usersEither.fold(always([]), identity)

  return right(users)
}
