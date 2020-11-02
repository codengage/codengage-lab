import { jwtDecrypterAdapter } from '@codengage/criptography-jwt'
import { FindUserByToken } from '../../domain/usecases/find_user_by_token'
import { dbFindUserByToken } from '../../data/usecases/db_find_user_by_token'
import { inMemoryUserRepository } from '../../infra/db/in_memory/in_memory_user_respository'

export const dbFindUserByTokenFactory = (): FindUserByToken => {
  const decrypter = jwtDecrypterAdapter({ secret: process.env.JWT_SECRET as string })
  const userRepository = inMemoryUserRepository()

  return dbFindUserByToken({
    decrypter,
    findUserByIdRepository: userRepository.findById,
  })
}
