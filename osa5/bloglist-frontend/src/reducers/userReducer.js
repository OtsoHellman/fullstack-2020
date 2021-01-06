import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET':
            return action.data.user
        default:
            return state
    }
}

export const setUser = user => ({
    type: 'SET',
    data: {
        user
    }
})

export const initializeUser = () => async dispatch => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
        const user = JSON.parse(loggedUser)
        dispatch(setUser(user))
        blogService.setToken(user.token)
    }
}

export const login = (username, password) => async dispatch => {
    const loggedUser = await loginService.login({
        username,
        password
    })
    dispatch(setUser(loggedUser))
    blogService.setToken(loggedUser.token)
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
}

export const logout = () => async dispatch => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setUser(null))
}

export default reducer