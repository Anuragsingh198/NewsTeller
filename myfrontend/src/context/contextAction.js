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
    return error.message || error;
  }
};

export const fetchTopNews = async (dispatch) => {
  try{
    const response = await fetch(`${VITE_BASE_URL}/articles/topnews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const  articles  = await response.json();
    
      // console.log('Top news array: ', articles)
    dispatch({ type: 'GET_TOP_NEWS', payload: articles });

    return articles;
  } catch(error){
    console.error('Fetch top news error:', error);
    return error.message || error;
  }
}

export const fetchAllNews = async (dispatch) => {
  try{
    const response = await fetch(`${VITE_BASE_URL}/articles/fetch`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const  articles  = await response.json();
    
      // console.log('Top news array: ', articles)
    dispatch({ type: 'GET_ALL_NEWS', payload: articles });

    return articles;
  } catch(error){
    console.error('Fetch top news error:', error);
    return error.message || error;
  }
}