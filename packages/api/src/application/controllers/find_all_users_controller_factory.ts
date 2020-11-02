import { Controller } from '@codengage/http-server'
import { findAllUsersController } from '../../presentation/controllers/find_all_users_controller'
import { dbFindAllUsersFactory } from '../usecases/db_find_all_users_factory'

export const findAllUsersControllerFactory = (): Controller => {
  const findAllUsers = dbFindAllUsersFactory()

  return findAllUsersController({
    findAllUsers,
  })
}
