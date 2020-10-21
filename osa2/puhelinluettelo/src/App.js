import React, { useState, useEffect } from 'react'
import personService from './services/personService'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMessage, setNotificationMessage] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  const handleFilterChange = (event) => setFilterValue(event.target.value)
  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`${newName} is already added in the phonebook, replace the old number with the new one?`)) {
        const personObject = persons.find(person => person.name === newName)
        personService
          .putPerson({
            ...personObject,
            number: newNumber
          })
          .then(data => setPersons(persons.map(person => person.id === data.id ? data : person)))
      }

    } else {
      personService
        .postPerson({
          name: newName,
          number: newNumber
        })
        .then(data => {
          setNotificationMessage(`Added ${data.name}`)
          setTimeout(() => setNotificationMessage(null), 2000)
          return data
        })
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id) => {
    personService
      .deletePerson(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {notificationMessage && <Notification message={notificationMessage} />}
      <div>
        filter shown with: <input
          value={filterValue}
          onChange={handleFilterChange} />
      </div>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonList persons={persons} filterValue={filterValue} deletePerson={(id) => (deletePerson(id))} />
    </div>
  )

}

export default App