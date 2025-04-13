/* eslint-disable no-unused-vars */
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/Authentication";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    // Using AppBar for header
    <AppBar position='static' sx={{ backgroundColor: '#1f1f1f',
        color: '#ffffff',
        padding: '16px 24px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        letterSpacing: '0.5px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)' }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant='h6' sx={{ fontWeight: "bold" }}>
          Task Management Application
        </Typography>
        <Typography
          sx={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          Welcome,<span style={{ color: "#ccc" }}>{user.username}</span>
          <AccountCircleIcon titleAccess={user.email} />
          <LogoutIcon
            sx={{ cursor: "pointer" }}
            onClick={()=> logout()}
          />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
