/* eslint-disable no-unused-vars */
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/Authentication";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const Header= ()=>{

    const {user, logout}= useContext(AuthContext);

    return(
        <AppBar position="static"  sx={{ backgroundColor: "#222", padding: "10px" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
            <Typography variant="h6" sx={{ color: "#00ff99", fontWeight: "bold" }}>
                Task Management Application
            </Typography>
            <Typography sx={{ color: "white", display: 'flex', flexDirection: 'row', alignItems: 'center', gap:2 }}>
                Welcome,<span style={{ color: "#00ff99" }}>{"Akshay"}</span>
                <AccountCircleIcon/>
                <LogoutIcon sx={{cursor: "pointer"}} onClick={logout}/>
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;