

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const SearchUsers = async (text) => {
    
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {  
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();
    // console.log(items);

    // dispatch({
    //   type: "GET_USERS",
    //   payload: items,
    // }); we don't need this, we just need to return items

    return items
  };

  export const getUser = async (login) => {
    // setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      console.log('User data', data)

      // dispatch({
      //   type: "GET_SINGLE_USER",
      //   payload: data,
      // });
      return data;
    }
  };

  export const getUserRepo = async (login) => {
    // setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 5
    });

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    // console.log(data)

    // dispatch({
    //   type: "GET_USER_REPOS",
    //   payload: data,
    // });
    return data;
  };