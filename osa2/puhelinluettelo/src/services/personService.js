import axios from 'axios'

const DB_URI = 'http://localhost:3001/persons'

const getAll = () => axios
    .get(DB_URI)
    .then(response => response.data)

const postPerson = (personObject) => axios
    .post(DB_URI, personObject)
    .then(response => response.data)

const deletePerson = (id) => axios
    .delete(`${DB_URI}/${id}`)
    .then(response => console.log(response))

export default { getAll, postPerson, deletePerson }