
const BACKEND_URL = process.env.REACT_APP_BASE_URL;

export const SearchUsers = async (text) => {
    
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${BACKEND_URL}/search/users?${params}`);
    const { items } = await response.json();
    return items
  };

  export const getUser = async (login) => {
    const response = await fetch(`${BACKEND_URL}/users/${login}`);

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      console.log('User data', data)
      return data;
    }
  };

  export const getUserRepo = async (login) => {
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 5
    });
    const response = await fetch(`${BACKEND_URL}/users/${login}/repos?${params}`);
    const data = await response.json();
    return data;
  };