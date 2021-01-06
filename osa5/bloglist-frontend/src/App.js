import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import { setNotificationMessage } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, postLike } from './reducers/blogReducer'
import blogService from './services/blogs'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({
        username,
        password
      })
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
    } catch (error) {
      console.log(error)
      dispatch(setNotificationMessage('wrong username or password', true, 2000))
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setNotificationMessage(`user ${user.username} logged out`, false, 2000))
    setUser(null)
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