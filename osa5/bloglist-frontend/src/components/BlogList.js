import React from 'react'
import Blog from './Blog'

export default ({ blogs, postLike }) => <div>
    {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} postLike={postLike} />
    )}
</div>