import api from '../api/index';


export const login = (username: string, password: string) => {
  // return axios.post(API_URL + 'login', { email, password });

  return api.post('/auth/login', { username, password })
      .then((response) => {
         console.log(response.data);
         console.log(response.headers.authorization);
         localStorage.setItem('user', JSON.stringify(response.data));
         localStorage.setItem('token', response.data.token); 
         return response.data as LoginResponse;
      });
};

export const register = (username: string, email: string, password: string) => {
  return api.post('/auth/register', {username, email, password });
  
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  const auth_token = localStorage.getItem('auth_token');
  const currentUser = JSON.parse(userStr);

  if (currentUser) {
     return currentUser;
  }
  return null;
};