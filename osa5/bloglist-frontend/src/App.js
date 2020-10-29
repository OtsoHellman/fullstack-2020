import React, { useState, useEffect } from 'react'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
      window.alert('wrong credentials')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const postBlog = async (blog) => {
    const response = await blogService.postBlog(blog)
    setBlogs(blogs.concat(response))
  }

  return user ? <BlogView blogs={blogs} name={user && user.name} handleLogout={handleLogout} postBlog={postBlog} /> : <LoginForm handleLogin={handleLogin} />
}

export default App