import { always, left, identity, right } from '@codengage/fp'
import { Failure, UseCaseFactory } from '@codengage/domain'
import { DecrypterPort } from '@codengage/criptography'
import { DbFindUserByIdRepository } from '../repositories/db_find_user_by_id_repository'
import { FindUserByToken } from '../../domain/usecases/find_user_by_token'

type Ports = {
  decrypter: DecrypterPort
  findUserByIdRepository: DbFindUserByIdRepository
}

export const dbFindUserByToken: UseCaseFactory<Ports, FindUserByToken> = ports => async params => {
  try {
    const token = await ports.decrypter({
      ciphertext: params.accessToken,
    })

    if (!token) {
      return left(new Failure('invalid token'))
    }

    const userEither = await ports.findUserByIdRepository({ id: token })
    const user = userEither.fold(always(null), identity)

    if (!user) {
      return left(new Failure('invalid token'))
    }

    return right(user)
  } catch (e) {
    return left(new Failure('invalid token'))
  }
}
