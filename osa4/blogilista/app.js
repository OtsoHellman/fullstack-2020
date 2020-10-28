import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import morgan from 'morgan'
import blogsRouter from './routes/blogs.js'
import usersRouter from './routes/users.js'
import config from './utils/config.js'
const app = express()

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(morgan('tiny', { skip: (req, res) => process.env.NODE_ENV === 'test' }))
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

export default app