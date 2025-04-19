const contextReducer = (state, action) => {
    switch (action.type){
        case 'USER_LOGIN':
            return {
                ...state,
                user: action.payload,
                loading: false,
            }
        case 'USER_REGISTER':
            
            return{
                ...state,
                user: action.payload,
                loading: false
            }
        case 'SET_LOADING':
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default contextReducer