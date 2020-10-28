import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import User from '../models/user.js'

const api = supertest(app)

const users = [
    {
        username: "testijäbä 1",
        name: "Jukka Välimaa",
        password: "salasana"
    },
    {
        username: "testijäbä 2",
        name: "Jukka Alamaa",
        password: "salasana1123"
    },
    {
        username: "testijäbä 3",
        name: "Jukka Alatalo",
        password: "Sala_sana"
    }
]

const newUser = {
    "username": "root",
    "password": "root",
    "name": "Jukka Jalonen"
}

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(users)
})


describe('users', () => {
    test('are returned as json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('can be added to database', async () => {
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(users.length + 1)
    })


    test('reject new users with existing username or too short username/password', async () => {
        const shortUsernameUser = {
            username: "a",
            name: "Birgitta Ylämaasto",
            password: "uliuli"
        }

        const shortPasswordUser = {
            username: "aasi",
            name: "Birgitta Ylämetsä",
            password: "ui"
        }

        const existingName = {
            username: users[0].username,
            name: "Birgitta Ylämetsä",
            password: "rootroot"
        }

        await api
            .post('/api/users')
            .send(shortUsernameUser)
            .expect(400)

        await api
            .post('/api/users')
            .send(shortPasswordUser)
            .expect(400)
        await api
            .post('/api/users')
            .send(existingName)
            .expect(400)


        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(users.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})