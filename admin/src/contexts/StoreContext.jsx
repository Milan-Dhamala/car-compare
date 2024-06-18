import { createContext, useEffect, useState } from "react";
import axios from 'axios'

const StoreContext = createContext(null);

export const StoreContextProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    const login = async (name, password) => {
        try {
          const response = await axios.post('http://localhost:4000/api/user/login', {
            name,
            password,
          });
          const { token } = response.data;
          setToken(token);
          return token;
        } catch (error) {
          console.error('Login failed:', error);
          return null;
        }
      };
    
      const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
      };

      return (
        <StoreContext.Provider value={{ token, login, logout }}>
          {children}
        </StoreContext.Provider>
      );
;}


export default StoreContext;

