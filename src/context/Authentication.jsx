/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, use, useEffect, useState } from "react";
import useApi from "../api/useApi";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Auth states
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLogin, setInitialLogin] = useState(false);
  
  // useEffect for checking token expiry
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      axios
        .get(`${BASE_URL}auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          if (response) {
            setIsAuth(true);
            setUser(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // After getting access token from login
  const login = (access_token) => {
    localStorage.setItem("access_token", access_token);
    axios
      .get(`${BASE_URL}auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (response) {
          setIsAuth(true);
          setUser(response.data);
          setInitialLogin(true);
        }
      })
      .catch(() => {
        setIsAuth(false);
        setUser(null);
        setInitialLogin(false);
        toast.info("Your session timed out, please login Again !")
      });
  };

  // const logout
  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuth(false);
    setUser(null);
    setInitialLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        loading,
        login,
        logout,
        initialLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
