import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ user, handleLogout }) => <div>
    <Link to="/">Blogs</Link>
    <Link to="/users">Users</Link>
    {user.name} logged in
        <button onClick={handleLogout}>log out</button>
</div>

export default Header