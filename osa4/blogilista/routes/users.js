import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
const usersRouter = express.Router()


usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    return res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
    if (!req.body || !req.body.username || !req.body.name || !req.body.password) {
        return res.status(400).send('parameters missing')
    }

    const { name, username, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = await new User({
        name,
        username,
        passwordHash
    }).save()

    res.json(newUser)
})


export default usersRouter