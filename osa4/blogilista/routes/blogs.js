import express from 'express'
import Blog from '../models/blog.js'
const blogsRouter = express.Router()

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    
    if (!request.body || !request.body.title || !request.body.url) {
        return response.status(400).send('title or url missing')
    }

    const blog = new Blog({
        ...request.body,
        likes: request.body.likes || 0
    })
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

export default blogsRouter