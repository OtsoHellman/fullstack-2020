import React from 'react'
import Blog from './Blog'

export default ({ blogs, name, handleLogout }) => <div>
    <h2>blogs</h2>
    {name}
    <button onClick={handleLogout}>log out</button>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )}
</div>