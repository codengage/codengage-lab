import { Either } from '@codengage/fp'

import { Failure } from './failure'

export type UseCase<Params = any, Result = any, F extends Failure = Failure> = (
  params: Params,
) => Promise<Either<F, Result>>

export type UseCaseFactory<Ports, U extends UseCase> = (ports: Ports) => U
