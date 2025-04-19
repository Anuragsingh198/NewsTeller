import { createContext, useEffect, useReducer } from "react";
import  contextReducer  from "./contextReducer"
const context = createContext()

export const ContextProvider = ({ children }) => {
    const initialState = {
        news: [],
        topNews: [],
    isLoading: false,
    isSuccess: false,
    user: null,
  };

     useEffect(()=>{
        console.log(initialState)
     }, [initialState])

    const [state, dispatch] = useReducer(contextReducer, initialState);  
    return (
      <context.Provider
        value={{
          ...state, 
          dispatch
        }}
      >
        {children}
      </context.Provider>
    );
  };
  export default context;

