import { getRight, isRight, left, right } from '@codengage/fp'
import { Failure } from '@codengage/domain'
import { HasherPort } from '@codengage/criptography'
import { User } from '../../../src/domain/entities/user'
import { dbCreateUser } from '../../../src/data/usecases/db_create_user'
import { DbCreateUserRepository } from '../../../src/data/repositories/db_create_user_repository'
import { DbFindUserByEmailRepository } from '../../../src/data/repositories/db_find_user_by_email_repository'

describe('data > usecases > db_create_user', () => {
  it('should create an user', async () => {
    // arrange
    const tHash: string = 'hash'
    const tUser: User = { id: '1', name: 'User', email: 'user@email.com', password: tHash }
    const mockHasherPort: HasherPort = jest.fn().mockImplementation(() => Promise.resolve(tHash))
    const mockDbCreateUserRepository: DbCreateUserRepository = jest
      .fn()
      .mockImplementation(() => Promise.resolve(right(tUser)))
    const mockDbFindUserByEmailRepository: DbFindUserByEmailRepository = jest
      .fn()
      .mockImplementation(() => Promise.resolve(left(new Failure('user not found'))))
    const usecase = dbCreateUser({
      hasher: mockHasherPort,
      createUserRepository: mockDbCreateUserRepository,
      findUserByEmailRepository: mockDbFindUserByEmailRepository,
    })

    // act
    const result = await usecase({ name: 'User', email: 'user@email.com', password: '123' })

    // assert
    expect(isRight(result)).toBeTruthy()
    expect(getRight(result)).toEqual(tUser)
    expect(mockDbFindUserByEmailRepository).toBeCalledWith({ email: 'user@email.com' })
    expect(mockDbFindUserByEmailRepository).toBeCalledTimes(1)
    expect(mockHasherPort).toBeCalledWith({ plaintext: '123' })
    expect(mockHasherPort).toBeCalledTimes(1)
    expect(mockDbCreateUserRepository).toBeCalledWith({ name: 'User', email: 'user@email.com', password: tHash })
    expect(mockDbCreateUserRepository).toBeCalledTimes(1)
  })
})
