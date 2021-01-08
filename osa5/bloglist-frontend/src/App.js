import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import Notification from './components/Notification'
import Header from './components/Header'
import UsersView from './components/UsersView'
import User from './components/User'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import { setNotificationMessage } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs, postLike } from './reducers/blogReducer'
import { initializeUser, login, logout } from './reducers/userReducer'
import userService from './services/user'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const activeUser = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    userService.getAll()
      .then(response => setUsers(response))
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
    dispatch(setNotificationMessage(`user ${activeUser.username} logged out`, false, 2000))
  }

  const userMatch = useRouteMatch("/users/:id")
  const user = userMatch ? users.find(u => u.id === userMatch.params.id) : null
  return <>
    <Notification />
    {
      activeUser
        ?
        <>
          <Header user={activeUser} handleLogout={handleLogout} />
          <Switch>
            <Route path="/users/:id">
              <User user={user} />
            </Route>
            <Route path="/users">
              <UsersView users={users} />
            </Route>
            <Route path="/">
              <BlogView
                blogs={blogs}
                user={activeUser}
                postBlog={async (blog) => dispatch(createBlog(blog))}
                postLike={async (blog) => dispatch(postLike(blog))}
                removeBlog={async (blog) => dispatch(deleteBlog(blog))} />
            </Route>
          </Switch>
        </>
        : <LoginForm handleLogin={handleLogin} />
    }
  </>
}

export default App