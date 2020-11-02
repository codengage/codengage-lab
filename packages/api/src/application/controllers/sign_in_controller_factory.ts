import { Controller } from '@codengage/http-server'
import { signInController } from '../../presentation/controllers/sign_in_controller'
import { dbSignInFactory } from '../usecases/db_sign_in_factory'

export const signInControllerFactory = (): Controller => {
  const signIn = dbSignInFactory()

  return signInController({
    signIn,
  })
}
