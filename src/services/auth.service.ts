import api from '../api/index'

interface LoginResponse {
  token: string
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  // return axios.post(API_URL + 'login', { email, password });

  return api.post<LoginResponse>('/auth/login', { username, password }).then((response) => {
    console.log(response.data)
    console.log(response.headers.authorization)
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('token', response.data.token)
    return response.data
  })
}

export const register = (username: string, email: string, password: string) => {
  return api.post('/auth/register', { username, email, password })
  // return auth_service_httpClient.post('/signup', {
  //    data: {
  //       user: {
  //          username: username,
  //          email: email,
  //          password: password,
  //       },
  //    },
  // });

  // try {
  //   const response = await api.post('/auth/register', {username, email, password });
  //   alert('User registered successfully!');
  //   navigate('/login');
  // } catch (error: any) {
  //   setError(error.response?.data?.message || 'Failed to register');
  // }
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user') || ''
  const currentUser = JSON.parse(userStr)

  if (currentUser) {
    return currentUser
  }
  return null
}
