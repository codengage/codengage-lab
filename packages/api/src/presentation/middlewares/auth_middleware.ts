import { always, identity } from '@codengage/fp'
import { MiddlewareFactory, ok, forbidden, serverError, unauthorized } from '@codengage/http-server'
import { FindUserByToken } from '../../domain/usecases/find_user_by_token'

type Ports = {
  findUserByToken: FindUserByToken
}

export const authMiddleware: MiddlewareFactory<Ports> = ports => async req => {
  try {
    const [type, accessToken] = (req?.headers?.authorization ?? '').split(' ')

    if (type !== 'Bearer' || !accessToken) {
      return unauthorized()
    }

    const userEither = await ports.findUserByToken({
      accessToken,
    })
    const user = userEither.fold(always(null), identity)

    if (!user) {
      return forbidden()
    }

    return ok({
      userId: user.id,
    })
  } catch (e) {
    return serverError(e)
  }
}
