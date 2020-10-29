import axios from 'axios'
const baseUrl = `${process.env.REACT_APP_API_URL}/api/login`

const login = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

export default { login }