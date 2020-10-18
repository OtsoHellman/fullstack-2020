import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filterValue, setFilterValue] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleFilterChange = (event) => setFilterValue(event.target.value)
  const handlePersonChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.map(obj => obj.name).includes(newName)) {
      window.alert(`${newName} is already added in the phonebook`)
    } else {
      setPersons(persons.concat({
        name: newName,
        number: newNumber
      }))
      setNewName('')
      setNewNumber('')
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