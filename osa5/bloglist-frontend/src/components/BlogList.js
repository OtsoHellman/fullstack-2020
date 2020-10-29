import React from 'react'
import Blog from './Blog'

export default ({ blogs }) => <div>
    <h2>blogs</h2>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
    )}
</div>