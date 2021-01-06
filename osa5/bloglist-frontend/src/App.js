import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import { setNotificationMessage } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, postLike } from './reducers/blogReducer'
import { initializeUser, login, logout } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  const handleLogin = async (username, password) => {
    try {
      dispatch(login(username, password))
    } catch (error) {
      console.log(error)
      dispatch(setNotificationMessage('wrong username or password', true, 2000))
    }
  }
  const handleLogout = async () => {
    dispatch(logout())
    dispatch(setNotificationMessage(`user ${user.username} logged out`, false, 2000))
  }
  return <>
    <Notification />
    {user
      ? <BlogView
        blogs={blogs}
        user={user}
        handleLogout={handleLogout}
        postBlog={async (blog) => dispatch(createBlog(blog))}
        postLike={async (blog) => dispatch(postLike(blog))}
        removeBlog={async (blog) => dispatch(deleteBlog(blog))} />
      : <LoginForm handleLogin={handleLogin} />}
  </>
}

export default App