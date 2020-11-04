import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const triggerLogin = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return <form id="loginForm" onSubmit={triggerLogin}>
    <div>
            username
      <input
        id="usernameInput"
        type="text"
        value={username}
        onChange={({ target }) => setUsername(target.value)} />
    </div>
    <div>
            password
      <input
        id="passwordInput"
        type="text"
        value={password}
        onChange={({ target }) => setPassword(target.value)} />
    </div>
    <button id="submitLogin" type="submit">login</button>
  </form>
}

export default LoginForm