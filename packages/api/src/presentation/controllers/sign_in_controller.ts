import { always } from '@codengage/fp'
import { ControllerFactory, ok, badRequest, forbidden, serverError } from '@codengage/http-server'
import { SignIn } from '../../domain/usecases/sign_in'

type Ports = {
  signIn: SignIn
}

export const signInController: ControllerFactory<Ports> = ports => async req => {
  try {
    const { email, password } = req.body || {}

    if (!email) {
      return badRequest({
        email: 'email must be not empty',
      })
    }

    if (!password) {
      return badRequest({
        password: 'password must be not empty',
      })
    }

    const authEither = await ports.signIn({
      email,
      password,
    })

    const respose = authEither.fold(
      always(
        forbidden({
          auth: 'invalid credentials',
        }),
      ),
      ok,
    )

    return respose
  } catch (e) {
    return serverError(e)
  }
}
