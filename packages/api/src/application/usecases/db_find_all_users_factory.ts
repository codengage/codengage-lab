import { FindAllUsers } from '../../domain/usecases/find_all_users'
import { dbFindAllUsers } from '../../data/usecases/db_find_all_users'
import { inMemoryUserRepository } from '../../infra/db/in_memory/in_memory_user_respository'

export const dbFindAllUsersFactory = (): FindAllUsers => {
  const userRepository = inMemoryUserRepository()

  return dbFindAllUsers({
    findAllUsersRepository: userRepository.findAll,
  })
}
