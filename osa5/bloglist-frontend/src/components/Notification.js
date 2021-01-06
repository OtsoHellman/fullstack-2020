import React from 'react'
import useSelector from 'react-redux'

const notificationStyle = isError => ({
  color: isError ? 'red' : 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
})

const Notification = () => {
  const message = useSelector(state => state.notificationMessage)
  const isError = useSelector(state => state.notificationIsError)
  return (message && 
    <div style={notificationStyle(isError)}>
      {message}
    </div>
  )
}

export default Notification