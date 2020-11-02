import { bcryptHasherAdapter } from '@codengage/criptography-bcrypt'
import { CreateUser } from '../../domain/usecases/create_user'
import { dbCreateUser } from '../../data/usecases/db_create_user'
import { inMemoryUserRepository } from '../../infra/db/in_memory/in_memory_user_respository'

export const dbCreateUserFactory = (): CreateUser => {
  const hasher = bcryptHasherAdapter({ salt: parseInt(process.env.BCRYPT_SALT as string, 10) })
  const userRepository = inMemoryUserRepository()

  return dbCreateUser({
    hasher,
    createUserRepository: userRepository.create,
    findUserByEmailRepository: userRepository.findByEmail,
  })
}
