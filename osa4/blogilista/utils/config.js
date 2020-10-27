import dotenv from 'dotenv'
dotenv.config()

let DB_URI = process.env.DB_URI
let PORT = process.env.PORT

if (process.env.NODE_ENV === 'test') {
    DB_URI = process.env.TEST_DB_URI
}

export default { DB_URI, PORT }