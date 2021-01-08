import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/user.js'
const usersRouter = express.Router()


usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, id: 1 })
    return res.json(users.map(user => user.toJSON()))
})

usersRouter.post('/', async (req, res) => {
    if (!req.body || !req.body.username || !req.body.name || !req.body.password) {
        return res.status(400).send('parameters missing')
    }

    const { name, username, password } = req.body

    if (password.length < 3) {
        return res.status(400).send('password too short')
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    try {
        const newUser = await new User({
            name,
            username,
            passwordHash
        }).save()
        res.status(201).json(newUser)
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).send({ err })
        }
    }
})

export default usersRouter