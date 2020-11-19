const initialState = null
let notificationTimeout

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


export const setNotification = (content, timeout) => dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: {
      content
    }
  })

  clearTimeout(notificationTimeout)
  notificationTimeout = setTimeout(() => {
    dispatch(clearNotification())
  }, 1000*timeout)
}

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})

export default reducer