import { Controller } from '@codengage/http-server'
import { createUserController } from '../../presentation/controllers/create_user_controller'
import { dbCreateUserFactory } from '../usecases/db_create_user_factory'

export const createUserControllerFactory = (): Controller => {
  const createUser = dbCreateUserFactory()

  return createUserController({
    createUser,
  })
}
