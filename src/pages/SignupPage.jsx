import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const SignupPage = () => {
  const [toggleForm, setToggleForm] = useState(false);

  const handleToggle = () => {
    setToggleForm((prev) => !prev);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        width: { md: "100vw" },
        backgroundImage: `url('/task_1.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        fontFamily: "cursive",
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          backgroundColor: "rgb(243, 230, 230)",
          border: "1px solid #000",
          borderRadius: "10px",
          boxShadow: "2px 4px 4px 2px rgba(180, 162, 162, 0.5)",
          display: "flex",
          flexDirection: "column",
          padding: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardHeader
          title={
            <Typography variant='h5' component='div' align='center'>
              {!toggleForm
                ? "Login to Task Management"
                : "Register to Task Management"}
            </Typography>
          }
        />
        <CardContent sx={{ columnGap: "10px" }}>
          {!toggleForm ? <Login /> : <Register />}
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
            padding: 0,
            margin: 0,
          }}
        >
          <Button variant='text' size='small' onClick={handleToggle}>
            {toggleForm
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default SignupPage;
