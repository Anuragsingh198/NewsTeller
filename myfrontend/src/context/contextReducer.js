const contextReducer = (state, action) => {
    switch (action.type){
        case 'GET_ARTICLES':
            return {
                ...state,
                news: action.payload,
                loading: false,
            }
        case 'GET_TOP_NEWS':
            
            return{
                ...state,
                topNews: action.payload,
                loading: false
            }
        case 'GET_ALL_NEWS':
            return{
                ...state,
                allNews: action.payload,
                loading: false
            }
        case "SET_LOADING":
                return { ...state, isLoading: action.payload };              
        case 'LOGIN':
            localStorage.setItem('user', JSON.stringify(action.payload));
            return { ...state, user: action.payload };
          
        case 'LOGOUT':
            localStorage.removeItem('user');
            return { ...state, user: null };
          
        default:
            return state
    }
}

export default contextReducer