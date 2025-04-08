import { Box, CircularProgress } from "@mui/material";
import Header from "../components/TaskComponents/Header";
import MainComponent from "../components/TaskComponents/MainComponent";
import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";

const TaskDashboard = () => {
  const { loading, setLoading } = useContext(DataContext);

  useEffect(()=>{
    setLoading(false);
  },[]);
  return (
    <Box sx={{ minHeight: "100vh", background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',}}>
      <Header />
      <MainComponent />
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)", 
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default TaskDashboard;
