import { getAll, post, vote } from '../services/anecdoteService'


const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortedAnecdotes = anecdotes => {
  // there probably should be a way for automatically applying this after an action?
  return [...anecdotes].sort((a, b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const changedAnecdote = {
        ...action.data.anecdote,
        votes: action.data.anecdote.votes + 1
      }
      return sortedAnecdotes(state.map(anecdote => anecdote.id === action.data.anecdote.id ? changedAnecdote : anecdote))
    case 'CREATE':
      return sortedAnecdotes([...state, action.data.content])

    case 'INITIALIZE':
      return action.data.anecdotes
    default:
      return state
  }
}

export const voteAnecdote = anecdote => async dispatch => {
  await vote(anecdote)
  dispatch({
    type: 'VOTE',
    data: {
      anecdote
    }
  })
}

export const createAnecdote = content => async dispatch => {
  const anecdote = await post(content)
  dispatch({
    type: 'CREATE',
    data: {
      content: anecdote
    }
  })
}

export const initializeAnecdotes = () => (
  async dispatch => {
    const anecdotes = await getAll()
    dispatch({
      type: 'INITIALIZE',
      data: {
        anecdotes
      }
    })
  })

export default reducer
