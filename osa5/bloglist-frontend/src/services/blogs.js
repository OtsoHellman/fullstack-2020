import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/blogs`
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const removeBlog = async blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response
}

const postLike = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  return response.data
}

export default { getAll, postBlog, setToken, postLike, removeBlog }