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

blogsRouter.put('/:id', async (request, response) => {
    if (!request.body) {
        return response.status(400).end()
    }
    const databaseResponse = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(databaseResponse.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

export default blogsRouter