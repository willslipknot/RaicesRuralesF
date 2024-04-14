// context/AuthContext.js

import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, updateUserRequest } from '../api/auth.js'


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signup = async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    const signin = async (user) => {
        try {
          const res = await loginRequest(user);
          console.log(res);
          setUser(res.data);
          setIsAuthenticated(true);
      
          localStorage.setItem('token', res.data.token);
      
        } catch (error) {
          if (Array.isArray(error.response.data)) {
            return setErrors(error.response.data);
          }
          setErrors([error.response.data.message]);
        }
      };
      

    const logout = (() => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUser(null)
    })

    const updateUser = async(id, user) =>{
        const res = await updateUserRequest(id, user)
     }
 

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    useEffect(() => {
        async function checkLogin() {
          const token = localStorage.getItem('token');
          if (!token) {
            setIsAuthenticated(false);
            setLoading(false);
            return setUser(null);
          }
      
          try {
            const res = await verifyTokenRequest(token);
            console.log(res);
            if (!res.data) {
              setIsAuthenticated(false);
              setLoading(false);
              return;
            }
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
            setLoading(false);
          }
        }
        checkLogin();
      }, []);
      


    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                user,
                isAuthenticated,
                errors,
                loading,
                logout,
                updateUser,
            }}
        > {children}
        </AuthContext.Provider>
    );
};
