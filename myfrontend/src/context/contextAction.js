const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchNews = async (dispatch, pgNo) => {
  try {
    

    const response = await fetch(`${VITE_BASE_URL}/articles/fetch/${pgNo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const  articles  = await response.json();
    
      console.log('the data from context Action: ', articles)
    dispatch({ type: 'GET_ARTICLES', payload: articles });

    return articles;
  } catch (error) {
    console.error('Fetch news error:', error);
  }
};

export const SearchUsers = async (text) => {
    
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${VITE_BASE_URL}/search/users?${params}`);
    const { items } = await response.json();
    return items
  };

  export const getUser = async (login) => {
    const response = await fetch(`${VITE_BASE_URL}/users/${login}`);

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
    const response = await fetch(`${VITE_BASE_URL}/users/${login}/repos?${params}`);
    const data = await response.json();
    return data;
  };