import { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from 'config'
const router = Router()

import User from '../models/User'


//api/users register user public
router.post('/',
    [check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 })],
    async (req: Request, res: Response) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body

        try {
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ msg: "User already exists" })
            }


            user = new User({
                name,
                email,
                password
            })

            const payload = {
                user: {
                    id: user.id
                }
            }

            user.save()

            jwt.sign(payload, config.get("JWTsecret"), {
                expiresIn: 36000
            }, (err, token) => {
                if (err) throw err
                res.json({ token })
            })

        } catch (error) {
            console.error(error)
            res.status(500).send('server error')
        }

    })


export default router