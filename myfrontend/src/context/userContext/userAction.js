
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const UserLogin = async (dispatch, email, password) => {
    console.log('The base url is',VITE_BASE_URL)
    try {
      const response = await fetch(`${VITE_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      dispatch({ type: 'USER_LOGIN', payload: data });
      return data;
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  export const RegisterUser = async (dispatch, username, email, password) => {
    console.log('The base url is', VITE_BASE_URL)


    try {
      const response = await fetch(`${VITE_BASE_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

  
      const data = await response.json();
  
      dispatch({ type: 'USER_REGISTER', payload: data });
      return data;
    } catch (error) {
      console.error('Register error:', error);
    }
  };
  
  