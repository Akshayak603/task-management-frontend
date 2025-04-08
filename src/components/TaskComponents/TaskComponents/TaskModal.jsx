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
          backgroundColor: "#1a1a1a",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          width: 300,
          maxHeight: 400,
          overflow: "auto",
          color: "#f5f5f5"
        }}
      >
        <ModalForm
          editData={mode === "edit" ? taskData : null}
          mode={mode}
          close={handleClose}
        />
      </Box>
    </Modal>
  );
};

export default TaskModal;
