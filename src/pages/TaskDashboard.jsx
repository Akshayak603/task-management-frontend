import { Box, CircularProgress } from "@mui/material";
import Header from "../components/TaskComponents/Header";
import MainComponent from "../components/TaskComponents/MainComponent";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Loader from "../components/TaskComponents/Loader";

const TaskDashboard = () => {
  const { loading } = useContext(DataContext);
  return (
    <>
    {loading && <Loader/> }
    <Box sx={{ minHeight: "100vh", background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',}}>
      <Header />
      <MainComponent />
    </Box>
    </>
  );
};

export default TaskDashboard;
