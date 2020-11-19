import React from 'react'
import { connect } from 'react-redux'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const create = event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(anecdote)
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={create}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    </div>
}


const ConnectedAnecdoteForm = connect(
    null,
    { createAnecdote }
)(AnecdoteForm)

export default ConnectedAnecdoteForm