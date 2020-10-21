import React, { useState, useEffect } from 'react'
import personService from './services/personService'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
    if (persons.map(obj => obj.name).includes(newName)) {
      window.alert(`${newName} is already added in the phonebook`)
    } else {
      personService
        .postPerson({
          name: newName,
          number: newNumber
        })
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input
          value={filterValue}
          onChange={handleFilterChange} />
      </div>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonList persons={persons} filterValue={filterValue} />
    </div>
  )

}

export default App