import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({ message: null, isError: null })

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
      setNotificationMessage(({ message: "wrong username or password", isError: true }))
      setTimeout(() => {
        setNotificationMessage({ message: null, isError: null })
      }, 2000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setNotificationMessage(({ message: `user ${user.username} logged out`, isError: false }))
    setTimeout(() => {
      setNotificationMessage({ message: null, isError: null })
    }, 2000)
    setUser(null)
  }

  const postBlog = async (blog) => {
    const response = await blogService.postBlog(blog)
    setNotificationMessage(({ message: `new blog ${response.title} by ${response.author} added`, isError: false }))
    setTimeout(() => {
      setNotificationMessage({ message: null, isError: null })
    }, 2000)
    setBlogs(blogs.concat(response))
  }

  return <>
    {notificationMessage.message && <Notification message={notificationMessage.message} isError={notificationMessage.isError} />}
    {user ? <BlogView blogs={blogs} name={user && user.name} handleLogout={handleLogout} postBlog={postBlog} /> : <LoginForm handleLogin={handleLogin} />}
  </>
}

export default App