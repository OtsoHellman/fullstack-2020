import React from 'react'

const notificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: '20px',
  borderStyle: 'solid',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}

const Notification = ({ message }) => {
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification