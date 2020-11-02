import { Port } from './port'

export type Adapter<P extends Port, Params> = (params: Params) => P
