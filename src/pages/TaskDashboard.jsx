import { Box } from "@mui/material"
import Header from "../components/TaskComponents/Header";
import MainComponent from "../components/TaskComponents/MainComponent";

const TaskDashboard= ()=>{
    return (
        <Box sx={{minHeight: "100vh", background: '#111'}}>
           <Header/>
           <MainComponent/>
        </Box>
    )
}

export default TaskDashboard;