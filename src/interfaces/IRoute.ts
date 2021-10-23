import { EntityTarget } from 'typeorm'

export interface IRoute<T> {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  path: string
  controller: EntityTarget<T>
  action: string
  isProtected?: boolean | false
  isAdmin?: boolean | false
}
