import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import User from '../models/user.js'
const loginRouter = express.Router()

loginRouter.post('', async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const tokenUser = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(tokenUser, process.env.SECRET)

    res.status(200).send({ token, username: user.username, name: user.name })
})

export default loginRouter