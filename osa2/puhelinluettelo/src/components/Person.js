import React from 'react'

export default ({ name, number, deletePerson }) => <li>
    {name} {number}
    <button onClick={() => window.confirm(`Delete ${name}?`) && deletePerson()}>delete</button>
</li >