import axios from 'axios'

const DB_URI = 'http://localhost:3001/persons'

const getAll = () => axios
    .get(DB_URI)
    .then(response => response.data)

const postPerson = (personObject) => axios
    .post(DB_URI, personObject)
    .then(response => response.data)

export default { getAll, postPerson }