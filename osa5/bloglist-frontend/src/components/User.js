import React from 'react'

const User = ({ user }) => user ? <>
    <h1>{user.name}</h1>
    <h3>added blogs</h3>
    <ul>
        {user.blogs.length > 0 && user.blogs.map(blog => <li key={blog.id}> {blog.title}
        </li>)}
    </ul>
</> : null

export default User