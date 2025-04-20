
import { createContext, useEffect, useReducer } from "react";
import contextReducer from "./contextReducer";

const context = createContext();

export const ContextProvider = ({ children }) => {
  const initialState = {
    news: [],
    allNews:[],
    topNews: [],
    isLoading: false,
    isSuccess: false,
    user: JSON.parse(localStorage.getItem("user")) || null, 
  };

  const [state, dispatch] = useReducer(contextReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(storedUser) });
    }
  }, []);
  
  return (
    <context.Provider value={{ ...state, dispatch }}>
      {children}
    </context.Provider>
  );
};

export default context;
