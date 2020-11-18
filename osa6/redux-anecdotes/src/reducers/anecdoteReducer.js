const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortedAnecdotes = anecdotes => {
  // there probably should be a way for automatically applying this after an action?
  return [...anecdotes].sort((a,b) => b.votes - a.votes)
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return sortedAnecdotes(state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote))
    case 'CREATE':
      return sortedAnecdotes([...state, asObject(action.data.content)])

    case 'INITIALIZE':
      return action.data.anecdotes
    default:
      return state
  }
}

export const voteAnecdote = id => ({
  type: 'VOTE',
  data: {
    id
  } 
})

export const createAnecdote = content => ({
  type: 'CREATE',
  data: {
    content
  } 
})

export const initializeAnecdotes = anecdotes => ({
  type: 'INITIALIZE',
  data: {
    anecdotes
  } 
})

export default reducer
