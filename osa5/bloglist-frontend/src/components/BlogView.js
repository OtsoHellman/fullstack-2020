import React, { useRef } from 'react'
import BlogList from './BlogList'
import BlogCreateForm from './BlogCreateForm'
import Togglable from './Togglable'

export default ({ blogs, handleLogout, postBlog, postLike, removeBlog, user }) => {
    const blogCreateFormRef = useRef()

    const postBlogHideToggle = (blog) => {
        blogCreateFormRef.current.toggleVisibility()
        postBlog(blog)
    }

    return <div>
        <h2>blogs</h2>
        {user.name}
        <button onClick={handleLogout}>log out</button>
        <Togglable buttonLabel="add blog" ref={blogCreateFormRef}>
            <BlogCreateForm postBlog={postBlogHideToggle} />
        </Togglable>
        <BlogList blogs={blogs} postLike={postLike} removeBlog={removeBlog} user={user} />
    </div>
}
