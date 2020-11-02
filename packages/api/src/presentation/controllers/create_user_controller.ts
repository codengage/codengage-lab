import { ControllerFactory, ok, badRequest, forbidden, serverError } from '@codengage/http-server'
import { CreateUser } from '../../domain/usecases/create_user'

type Ports = {
  createUser: CreateUser
}

export const createUserController: ControllerFactory<Ports> = ports => async req => {
  try {
    const { name, email, password } = req.body || {}

    if (!name) {
      return badRequest({
        name: 'name must be not empty',
      })
    }

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

    const userEither = await ports.createUser({
      name,
      email,
      password,
    })

    const respose = userEither.fold(forbidden, ok)

    return respose
  } catch (e) {
    return serverError(e)
  }
}
