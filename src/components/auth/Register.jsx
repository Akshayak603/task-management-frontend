/* eslint-disable no-unused-vars */
import { Box, Button, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useApi from "../../api/useApi";
import { BASE_URL } from "../../utils/constant";

const Register = () => {
  // Registration Data via controlled forms
  const [registeredData, setRegisteredData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // navigation
  const { post } = useApi(BASE_URL); // Api call
  // Registeration Handler
  const handleRegister = async () => {
    if (registeredData.password.length < 6) {
      toast.error("Password must be greater than 6 digits.");
    }

    const response = await post("auth/register", registeredData);
    console.log("Response", response);
    if (response) {
      toast.success("Registration Successfull");
      navigate("/login");
    } else {
      toast.error("Registration Failed");
    }
  };
  return (
    <Box
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
          variant='outlined'
          placeholder='Username'
          fullWidth
          value={registeredData.username}
          onChange={(e) =>
            setRegisteredData({ ...registeredData, username: e.target.value })
          }
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
        <InputLabel>Email</InputLabel>
        <TextField
          placeholder='Email'
          variant='outlined'
          fullWidth
          type='email'
          value={registeredData.email}
          onChange={(e) =>
            setRegisteredData(() => ({
              ...registeredData,
              email: e.target.value,
            }))
          }
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
          placeholder='Password'
          variant='outlined'
          fullWidth
          type='password'
          value={registeredData.password}
          onChange={(e) =>
            setRegisteredData(() => ({
              ...registeredData,
              password: e.target.value,
            }))
          }
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
          onClick={handleRegister}
          sx={{ width: "5rem", backgroundColor: "rgb(36, 189, 203)" }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
