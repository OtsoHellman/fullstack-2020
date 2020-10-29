import React, { useState } from 'react'

export default ({ handleLogin }) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const triggerLogin = (event) => {
        event.preventDefault()
        handleLogin(username, password)
        setUsername("")
        setPassword("")
    }

    return <form onSubmit={triggerLogin}>
        <div>
            username
            <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
            password
            <input
                type="text"
                value={password}
                onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
    </form>
}