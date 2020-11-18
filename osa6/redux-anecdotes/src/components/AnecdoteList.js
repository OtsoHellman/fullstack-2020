import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    const anecdoteContent = anecdotes.find(anecdote => anecdote.id === id).content
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`you voted '${anecdoteContent}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, (5000));
  }

  return <div>
      {anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
        .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
}

export default AnecdoteList