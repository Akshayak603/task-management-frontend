import { Box, CircularProgress } from "@mui/material"

const Loader= ()=>{
    return(
        <Box 
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '100vw',
            top:0,
            left:0,
            position: 'fixed',
            zIndex: 1000
        }}>
            <CircularProgress size={48} color="info" />
        </Box>
    )
}

export default Loader;