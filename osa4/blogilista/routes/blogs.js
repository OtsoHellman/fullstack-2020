import express from 'express'
import Blog from '../models/blog.js'
import User from '../models/user.js'
const blogsRouter = express.Router()

blogsRouter.get('/', (request, response) => {
    Blog
        .find({}).populate('user', { username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', async (request, response) => {

    if (!request.body || !request.body.title || !request.body.url) {
        return response.status(400).send('title or url missing')
    }

    const firstUserInDatabase = await User.findOne({})
    const blog = new Blog({
        ...request.body,
        likes: request.body.likes || 0,
        user: firstUserInDatabase.id
    })
    const databaseResponse = await blog.save()
    firstUserInDatabase.blogs = firstUserInDatabase.blogs.concat(databaseResponse._id)
    await firstUserInDatabase.save()
    return response.status(201).json(databaseResponse)
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