import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
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
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const loggedUser = await loginService.login({
        username,
        password
      })
      setUser(loggedUser)
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

  return user ? <BlogList blogs={blogs} name ={user && user.name} handleLogout={handleLogout} /> : <LoginForm handleLogin={handleLogin} />
}

export default App