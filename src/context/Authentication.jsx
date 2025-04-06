/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, use, useEffect, useState } from "react";
import useApi from "../api/useApi";
import { BASE_URL } from "../utils/constant";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLogin, setInitialLogin] = useState(false);
  const { get } = useApi(BASE_URL);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      get("auth/me")
        .then((response) => {
          if (response) {
            setIsAuth(true);
            setUser(response);
          }
        })
        .catch((error) => {
        console.log(error)
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // After getting access token from login
  const login = (access_token) => {
    localStorage.setItem("access_token", access_token);
    get("login")
      .then((response) => {
        if (response) {
          setIsAuth(true);
          setUser(response);
          setInitialLogin(true);
        }
      })
      .catch(() => {
        setIsAuth(false);
        setUser(null);
        setInitialLogin(false);
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
        initialLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
