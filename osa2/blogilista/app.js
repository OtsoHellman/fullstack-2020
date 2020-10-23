import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import blogsRouter from './routes/blogs.js'
import config from './utils/config.js'
const app = express()

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

export default app