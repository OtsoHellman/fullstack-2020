import React from 'react'

const Header = ({ user, handleLogout }) => (
    <>
        <h2>blogs</h2>
        {user.name}
        <button onClick={handleLogout}>log out</button>
    </>
)

export default Header