import axios from 'axios'

//const API_URL = 'http://backend-e-commerce-9fdb.onrender.com'
const API_URL = 'http://localhost:4000'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL +'/signup', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.token))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL +'/login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify({token : response.data.token, id : response.data._id,user: response.data.user}))
  }

  return response.data
}

// Get current user 
const getCurrentUser = async(userID) => {
  const response = await axios.get(API_URL + userID)
  return response.data
}

// Get All users
const getAllUsers = async() => {
  const response = await axios.get(API_URL + "/users")
  return response.data
}

// Delete user
const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/users/${userId}`)
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  getCurrentUser,
  getAllUsers,
  deleteUser 
}

export default authService
