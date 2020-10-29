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

export default { getAll, postBlog, setToken }