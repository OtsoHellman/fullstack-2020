const initialState = {
  message: null,
  isError: null
}
let notificationTimeout

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return {
        message: null,
        isError: null
      }
    default:
      return state
  }
}


export const setNotificationMessage = (message, isError, timeout) => dispatch => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: {
      message,
      isError
    }
  })

  clearTimeout(notificationTimeout)
  notificationTimeout = setTimeout(() => {
    dispatch(clearNotification())
  }, timeout)
}

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})

export default reducer