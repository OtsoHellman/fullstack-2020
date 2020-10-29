import React from 'react'
import BlogList from './BlogList'
import BlogCreateForm from './BlogCreateForm'

export default ({ blogs, name, handleLogout, postBlog }) => <div>
    <h2>blogs</h2>
    {name}
    <button onClick={handleLogout}>log out</button>
    <BlogCreateForm postBlog={postBlog} />
    <BlogList blogs={blogs} />
</div>
