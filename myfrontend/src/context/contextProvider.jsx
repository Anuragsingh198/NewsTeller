import { createContext, useReducer } from "react";
import { contextReducer } from "./contextReducer"
const context = createContext()

export const ContextProvider = ({ children }) => {
    // GithubProvider

  
    const initialState = {
        news: [],
    isLoading: false,
    isSuccess: false,
    user: '',

    };
  
    const [state, dispatch] = useReducer(contextReducer, initialState);
  
  
    return (
      <GithubContext.Provider
        value={{
          ...state, 
          dispatch
        }}
      >
        {children}
      </GithubContext.Provider>
    );
  };
  export default GithubContext;

