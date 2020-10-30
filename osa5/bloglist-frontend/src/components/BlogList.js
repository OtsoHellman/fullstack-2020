import React from 'react'
import Blog from './Blog'

export default ({ blogs, postLike }) => <div>
    {[...blogs]
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map(blog =>
            <Blog key={blog.id} blog={blog} postLike={postLike} />
        )}
</div>