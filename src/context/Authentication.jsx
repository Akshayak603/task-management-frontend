/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, use, useEffect, useState } from "react";
import useApi from "../api/useApi";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Auth states
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate= useNavigate();

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
          toast.success("Login Successfully.")
          navigate("/tasks");
        }
      })
      .catch(() => {
        setIsAuth(false);
        setUser(null);
      });
  };

  // const logout
  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuth(false);
    setUser(null);
    toast.info("Logged out successfully!");
  };

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
          else{
            toast.info("Token has expired, please login.")
            logout();
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

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
