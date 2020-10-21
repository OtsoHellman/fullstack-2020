import React from 'react'

const notificationStyle = isError => ({
  color: isError ? 'red' : 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
})

const Notification = ({ message, isError }) => {
  return (
    <div style={notificationStyle(isError)}>
      {message}
    </div>
  )
}

export default Notification