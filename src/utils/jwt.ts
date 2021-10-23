import { Response } from 'express'
import { sign, verify } from 'jsonwebtoken'
import { Request } from 'express'

export const generateAccessToken = (user: {
  username: string
  id: number
  role: 'cashier' | 'admin'
  branch: { id: number; name: string }
}) =>
  sign(
    {
      data: user,
    },
    process.env.JWT_KEY, //to be in env
    { expiresIn: '1d' }
  )

export const generateRefreshToken = (user: { id: number }) =>
  sign(
    {
      data: { id: user.id },
    },
    process.env.JWT_KEY, //to be in env
    { expiresIn: '7d' }
  )

export const authenticateToken = (isProtected: boolean) => {
  return (req: Request, res: Response, next: Function) => {
    if (!isProtected) return next()

    let access_token = req.headers.authorization

    if (!access_token)
      return res.status(401).send({ error: 'token are not set' })

    access_token = access_token.split(' ')[1]

    verify(access_token, process.env.JWT_KEY, (error: any, data: any) => {
      if (error) {
        if (error.name === 'TokenExpiredError')
          return res.status(403).send(error.name)

        return res.status(401).send({ error: 'tokens are dirty' })
      }
      req.body.currentUser = data.data
      next()
    })
  }
}

export const authenticateAdmin = (isAdmin: boolean) => {
  return (req: Request, res: Response, next: Function) => {
    if (isAdmin !== (req.body?.currentUser?.role !== 'admin')) {
      return next()
    }
    return res.status(401).send({ error: 'admin only' })
  }
}
