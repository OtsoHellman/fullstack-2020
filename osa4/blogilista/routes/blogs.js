import express from 'express'
import jwt from 'jsonwebtoken'
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
    try {
        // use var as a band-aid to make decodedToken visible outside try block because const doesnt seem to work
        var decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken) {
            return response.status(401).json({ error: "token missing or invalid" })
        }
    } catch (error) {
        return response.status(401).json({ error: "invalid token" })
    }

    if (!request.body || !request.body.title || !request.body.url) {
        return response.status(400).send('title or url missing')
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        ...request.body,
        likes: request.body.likes || 0,
        user: user.id
    })
    const databaseResponse = await blog.save()
    user.blogs = user.blogs.concat(databaseResponse._id)
    await user.save()
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
    try {
        // use var as a band-aid to make decodedToken visible outside try block because const doesnt seem to work
        var decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken) {
            return response.status(401).json({ error: "token missing or invalid" })
        }
    } catch (error) {
        return response.status(401).json({ error: "token invalid" })
    }
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(404).json({ error: "blog not found" })
    }
    if (blog.user.toString() !== decodedToken.id) {
        return response.status(403).json({ error: "only owner of blog can delete it" })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

export default blogsRouter