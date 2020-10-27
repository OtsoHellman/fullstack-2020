import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import Blog from '../models/blog.js'

const api = supertest(app)

const blogs = [
    { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5 },
    { title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12 },
    { title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10 },
    { title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0 }
]

const newBlog = { title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html" }

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(blogs)
})


describe('blogs', () => {


    test('are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns correct number of items', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogs.length)

    })

    test('have an id field', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => expect(blog.id).toBeDefined())
    })

    test('can be added to database', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(blogs.length + 1)
    })

    test('have 0 likes unless otherwise specified', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)

        const response = await api.get('/api/blogs')
        expect(response.body.find(blog => blog.title === "Type wars").likes).toEqual(0)
    })

    test('reject new blogs without name and url', async () => {
        const { author, title, url } = newBlog
        const noTitleBlog = {
            author,
            url
        }

        const noUrlBlog = {
            author,
            title
        }

        await api
            .post('/api/blogs')
            .send(noTitleBlog)
            .expect(400)

        await api
            .post('/api/blogs')
            .send(noUrlBlog)
            .expect(400)
    })

})


afterAll(() => {
    mongoose.connection.close()
})