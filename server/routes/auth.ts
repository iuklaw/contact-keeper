import { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from 'config'

import authMiddleware from '../middleware/auth'
import User from '../models/User'
import { UserInterface } from '../interfaces/user'

const router = Router()

//get api/auth get logged in, user private
router.get("/", authMiddleware, async (req: Request & { user: UserInterface }, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({ user })
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//get api/auth auth user and get token userpublic
router.post("/", [check('email', "Please include a valid email").isEmail(),
check('password', "Password is required").exists()], async (req: Request, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        const error = errors.array()
        return res.status(400).json({ msg: error[0].msg })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })
        if (!user) return res.status(400).json({ msg: "Invalid credentials" })

        user.comparePassword(password, (err, isMatch: boolean) => {
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })
            else {
                const payload = {
                    user: {
                        id: user.id
                    }
                }

                jwt.sign(payload, config.get("JWTsecret"), {
                    expiresIn: 36000
                }, (err, token) => {
                    if (err) throw err
                    res.json({ token })
                })
            }
        })
    } catch (error) {
        res.status(500).json({ msg: "Server error" })
    }

})




export default router




