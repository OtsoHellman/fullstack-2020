import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import { setNotificationMessage } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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

  const postBlog = async (blog) => {
    const response = await blogService.postBlog(blog)
    dispatch(setNotificationMessage(`new blog ${response.title} by ${response.author} added`, false, 2000))
    setBlogs(blogs.concat(response))
  }

  const removeBlog = async (blog) => {
    const response = await blogService.removeBlog(blog)
    response && setBlogs(blogs.filter(asd => asd.id !== blog.id))
  }

  const postLike = async (blog) => {
    const response = await blogService.postLike(blog)
    setBlogs(blogs.map(blog => blog.id === response.id ? response : blog))
  }

  return <>
    <Notification />
    {user
      ? <BlogView
        blogs={blogs}
        user={user}
        handleLogout={handleLogout}
        postBlog={postBlog}
        postLike={postLike}
        removeBlog={removeBlog} />
      : <LoginForm handleLogin={handleLogin} />}
  </>
}

export default App