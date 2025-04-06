import { Box, Modal } from "@mui/material";
import ModalForm from "./ModalForm";

const TaskModal = ({ handleClose, open, taskData, mode }) => {
    
  return (
    <Modal onClose={handleClose} open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgb(237, 215, 215)",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: 300,
          maxHeight: 400,
          overflow: "auto",
        }}
      >
        <ModalForm editData={mode === "edit" ? taskData : null} mode={mode}/>
      </Box>
    </Modal>
  );
};

export default TaskModal;
