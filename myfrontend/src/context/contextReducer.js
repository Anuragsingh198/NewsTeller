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
        case 'SET_LOADING':
            return{
                ...state,
                loading: true
            }
        case 'CLEAR_USER':
            return{
                ...state,
                users: []
            }
        default:
            return state
    }
}

export default contextReducer