import { Box, Button, InputLabel, TextField } from "@mui/material";

const Login = () => {
  return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: '15px'
    }}>
      <Box>
        <InputLabel>Username</InputLabel>
        <TextField
          variant='outlined'
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
          fullWidth
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
      <Box sx={{display:'flex', justifyContent: 'center'}}>
      <Button variant='contained' size='medium' sx={{ width: "5rem" ,backgroundColor:"rgb(36, 189, 203)"}}>
            Login
          </Button>
      </Box>
    </Box>
  );
};

export default Login;
