import React from 'react'
import Person from './Person'

const PersonList = ({ persons, filterValue, deletePerson }) => {

    return (
        <ul>
            {persons
                .filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
                .map(person => <Person key={person.name} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)} />)
            }
        </ul>
    )
}

export default PersonList
