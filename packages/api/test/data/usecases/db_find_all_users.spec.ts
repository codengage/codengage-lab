import { getRight, isRight, right } from '@codengage/fp'
import { User } from '../../../src/domain/entities/user'
import { dbFindAllUsers } from '../../../src/data/usecases/db_find_all_users'
import { DbFindAllUsersRepository } from '../../../src/data/repositories/db_find_all_users_repository'

describe('data > usecases > db_get_all_users', () => {
  it('should get a list of users from the repository', async () => {
    // arrange
    const tUsers: User[] = [{ id: '1', name: 'User', email: 'user@email.com', password: 'secret' }]
    const mockDbFindAllUsersRepository: DbFindAllUsersRepository = jest
      .fn()
      .mockImplementation(() => Promise.resolve(right(tUsers)))
    const usecase = dbFindAllUsers({ findAllUsersRepository: mockDbFindAllUsersRepository })

    // act
    const result = await usecase()

    // assert
    expect(isRight(result)).toBeTruthy()
    expect(getRight(result)).toEqual(tUsers)
    expect(mockDbFindAllUsersRepository).toBeCalledWith()
    expect(mockDbFindAllUsersRepository).toBeCalledTimes(1)
  })
})
