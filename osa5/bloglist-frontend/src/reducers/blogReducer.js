import blogService from '../services/blogs'
import { setNotificationMessage } from './notificationReducer'


const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INITIALIZE':
            return action.data.blogs
        case 'CREATE':
            return [...state, action.data.blog]
        case 'DELETE':
            return state.filter(blog => blog.id !== action.data.id)
        case 'POST_LIKE':
            return state.map(blog => blog.id === action.data.blog.id ? action.data.blog : blog)
        default:
            return state
    }
}

export const initializeBlogs = () => (
    async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE',
            data: {
                blogs
            }
        })
    })

export const createBlog = blog => async dispatch => {
    const response = await blogService.postBlog(blog)
    dispatch({
        type: 'CREATE',
        data: {
            blog: response
        }
    })
    dispatch(setNotificationMessage(`new blog ${response.title} by ${response.author} added`, false, 2000))
}

export const deleteBlog = blog => async dispatch => {
    const response = await blogService.removeBlog(blog)
    response && dispatch({
        type: 'DELETE',
        data: {
            id: blog.id
        }
    })
}

export const postLike = blog => async dispatch => {
    const response = await blogService.postLike(blog)
    dispatch({
        type: 'POST_LIKE',
        data: {
            blog: response
        }
    })
}

export default reducer