const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}


export const setNotification = (content) => ({
  type: 'SET_NOTIFICATION',
  data: {
    content
  }
})

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})

export default reducer