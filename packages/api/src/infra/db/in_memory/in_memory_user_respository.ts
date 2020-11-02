import { Failure } from '@codengage/domain'
import { left, right } from '@codengage/fp'
import { User } from '../../../domain/entities/user'
import { DbCreateUserRepository } from '../../../data/repositories/db_create_user_repository'
import { DbFindUserByIdRepository } from '../../../data/repositories/db_find_user_by_id_repository'
import { DbFindUserByEmailRepository } from '../../../data/repositories/db_find_user_by_email_repository'
import { DbFindAllUsersRepository } from 'packages/api/src/data/repositories/db_find_all_users_repository'

let id: number = 0
const users: User[] = []

export const inMemoryUserRepository = () => {
  const create: DbCreateUserRepository = async params => {
    id = id + 1
    const user: User = {
      id: id.toString(),
      name: params.name,
      email: params.email,
      password: params.password,
    }
    users.push(user)
    return right(user)
  }

  const findById: DbFindUserByIdRepository = async params => {
    const user = users.find(user => user.id === params.id)
    if (!user) {
      return left(new Failure('user not found'))
    }
    return right(user)
  }

  const findByEmail: DbFindUserByEmailRepository = async params => {
    const user = users.find(user => user.email === params.email)
    if (!user) {
      return left(new Failure('user not found'))
    }
    return right(user)
  }

  const findAll: DbFindAllUsersRepository = async () => {
    return right(users)
  }

  return {
    create,
    findById,
    findByEmail,
    findAll,
  }
}
