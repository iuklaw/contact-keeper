import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'

import { UserInterface } from '../interfaces/user'

export default (req: Request & { user: UserInterface }, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" })

    try {
        const { user }: any = jwt.verify(token, config.get("JWTsecret"));

        req.user = user

        next()
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" })
    }

}
