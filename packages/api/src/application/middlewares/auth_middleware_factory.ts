import { Middleware } from '@codengage/http-server'
import { authMiddleware } from '../../presentation/middlewares/auth_middleware'
import { dbFindUserByTokenFactory } from '../usecases/db_find_user_by_token_factory'

export const authMiddlewareFactory = (): Middleware => {
  const findUserByToken = dbFindUserByTokenFactory()

  return authMiddleware({
    findUserByToken,
  })
}
