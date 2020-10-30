import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, postLike, removeBlog, user }) => <div>
  {[...blogs]
    .sort((blogA, blogB) => blogB.likes - blogA.likes)
    .map(blog =>
      <Blog key={blog.id} blog={blog} postLike={postLike} removeBlog={removeBlog} user={user} />
    )}
</div>

export default BlogList