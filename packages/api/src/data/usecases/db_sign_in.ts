import { Failure, UseCaseFactory } from '@codengage/domain'
import { always, left, identity, right } from '@codengage/fp'
import { HashComparerPort, EncrypterPort } from '@codengage/criptography'
import { SignIn } from '../../domain/usecases/sign_in'
import { DbFindUserByEmailRepository } from '../repositories/db_find_user_by_email_repository'

type Ports = {
  encrypter: EncrypterPort
  hashComparer: HashComparerPort
  findUserByEmailRepository: DbFindUserByEmailRepository
}

export const dbSignIn: UseCaseFactory<Ports, SignIn> = ports => async params => {
  const userEither = await ports.findUserByEmailRepository({ email: params.email })
  const user = userEither.fold(always(null), identity)

  if (!user) {
    return left(new Failure('invalid credentials'))
  }

  const isValidPassword = await ports.hashComparer({
    digest: user.password,
    plaintext: params.password,
  })

  if (!isValidPassword) {
    return left(new Failure('invalid credentials'))
  }

  const accessToken = await ports.encrypter({
    plaintext: user.id,
  })

  return right({
    accessToken,
  })
}
