import { jwtEncrypterAdapter } from '@codengage/criptography-jwt'
import { bcryptHashComparerAdapter } from '@codengage/criptography-bcrypt'
import { SignIn } from '../../domain/usecases/sign_in'
import { dbSignIn } from '../../data/usecases/db_sign_in'
import { inMemoryUserRepository } from '../../infra/db/in_memory/in_memory_user_respository'

export const dbSignInFactory = (): SignIn => {
  const encrypter = jwtEncrypterAdapter({ secret: process.env.JWT_SECRET as string })
  const hashComparer = bcryptHashComparerAdapter()
  const userRepository = inMemoryUserRepository()

  return dbSignIn({
    encrypter,
    hashComparer,
    findUserByEmailRepository: userRepository.findByEmail,
  })
}
