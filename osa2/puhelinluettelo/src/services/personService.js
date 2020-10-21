import axios from 'axios'

const DB_URI = '/api/persons'

const getAll = () => axios
    .get(DB_URI)
    .then(response => response.data)

const postPerson = (personObject) => axios
    .post(DB_URI, personObject)
    .then(response => response.data)

const deletePerson = (id) => axios
    .delete(`${DB_URI}/${id}`)

const putPerson = (personObject) => axios
    .put(`${DB_URI}/${personObject.id}`, personObject)
    .then(response => response.data)

export default { getAll, postPerson, deletePerson, putPerson }