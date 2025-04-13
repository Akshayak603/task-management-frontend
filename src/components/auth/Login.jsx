/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Box, Button, InputLabel, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/Authentication";
import { BASE_URL } from "../../utils/constant";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // Login data
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginData.password.length < 6) {
      toast.error("Password must be greater than 6 digits.");
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, loginData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const { access_token } = response.data;
      await login(access_token);
    } catch (error) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <Box
    component="form"
    onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        rowGap: "15px",
      }}
    >
      <Box>
        <InputLabel>Username</InputLabel>
        <TextField
          placeholder='Username'
          variant='outlined'
          value={loginData.username}
          onChange={(e) =>
            setLoginData(() => ({ ...loginData, username: e.target.value }))
          }
          fullWidth
          type='text'
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgb(61, 58, 58)",
              },
              "&:hover fieldset": {
                borderColor: "rgb(61, 58, 58)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(36, 189, 203)",
              },
            },
          }}
        />
      </Box>
      <Box>
        <InputLabel>Password</InputLabel>
        <TextField
          variant='outlined'
          placeholder='Password'
          fullWidth
          value={loginData.password}
          onChange={(e) =>
            setLoginData(() => ({ ...loginData, password: e.target.value }))
          }
          type='password'
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgb(61, 58, 58)",
              },
              "&:hover fieldset": {
                borderColor: "rgb(61, 58, 58)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgb(36, 189, 203)",
              },
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant='contained'
          size='medium'
          type="submit"
          sx={{ width: "5rem", backgroundColor: "rgb(36, 189, 203)" }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
