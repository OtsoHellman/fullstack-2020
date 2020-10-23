import dotenv from 'dotenv'
dotenv.config()

const DB_URI = process.env.DB_URI
const PORT = process.env.PORT

export default { DB_URI, PORT }