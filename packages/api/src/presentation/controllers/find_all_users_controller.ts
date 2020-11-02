import { always } from '@codengage/fp'
import { ControllerFactory, ok, forbidden, serverError } from '@codengage/http-server'
import { FindAllUsers } from '../../domain/usecases/find_all_users'

type Ports = {
  findAllUsers: FindAllUsers
}

export const findAllUsersController: ControllerFactory<Ports> = ports => async () => {
  try {
    const findAllUsersEither = await ports.findAllUsers()

    const respose = findAllUsersEither.fold(always(forbidden()), ok)

    return respose
  } catch (e) {
    return serverError(e)
  }
}
