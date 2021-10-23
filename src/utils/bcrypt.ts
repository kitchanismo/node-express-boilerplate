import { compare, hash } from 'bcrypt'

const saltRounds = 10

export const hashPassword = (password: string) => {
  return hash(password, saltRounds).then((hash) => hash)
}

export const comparePassword = (password: string, hash: string) => {
  return compare(password, hash).then((result) => result)
}
