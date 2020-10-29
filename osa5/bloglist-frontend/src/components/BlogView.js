import React from 'react'
import BlogList from './BlogList'
import BlogCreateForm from './BlogCreateForm'
import Togglable from './Togglable'

export default ({ blogs, name, handleLogout, postBlog }) => <div>
    <h2>blogs</h2>
    {name}
    <button onClick={handleLogout}>log out</button>
    <Togglable buttonLabel="add blog">
        <BlogCreateForm postBlog={postBlog} />
    </Togglable>
    <BlogList blogs={blogs} />
</div>
