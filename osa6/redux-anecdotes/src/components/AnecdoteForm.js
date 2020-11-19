import React from 'react'
import { useDispatch } from 'react-redux'

import { post } from '../services/anecdoteService'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async event => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        await post(anecdote)
        dispatch(createAnecdote(anecdote))
    }

    return <div>
        <h2>create new</h2>
        <form onSubmit={create}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
    </div>
}


export default AnecdoteForm