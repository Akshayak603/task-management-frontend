/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TaskCard from "./TaskComponents/TaskCard";
import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TaskModal from "./TaskComponents/TaskModal";
import useApi from "../../api/useApi";
import { BASE_URL } from "../../utils/constant";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";

const MainComponent = () => {
  // Main data
  const [data, setData] = useState([]);

  const [draggedId, setDraggedId] = useState(null); // draggedId
  const [dragOverId, setDragOverId] = useState(null); // dragged Over Id (used in hover)
  const [editData, setEditData] = useState(null); // edit object pass on
  const [mode, setMode] = useState("add"); // which mode we are using
  const [deletingId, setDeletingId] = useState(null); // deleted Id for animation
  const { refreshPoint, setRefreshPoint, setLoading } = useContext(DataContext); // getting refresh point for latest data and loader

  // Get Initial Data using custom API
  const { get, del } = useApi(BASE_URL);

  // Modal state
  const [open, setOpen] = useState(false);

  // Modal Logic
  const openModal = (mode) => {
    setOpen(true);
    setMode(mode);
  };

  const closeModal = () => {
    setOpen(false);
  };

  // Drag And Drop Functionality
  // id of card which I start dragging (Start)
  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  // id of a crad on which I am hovering (Hover)
  const handleDragOver = (e, id) => {
    e.preventDefault();
    setDragOverId(id);
  };
  // to reset on end
  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  }

  // Target Id of a card where we are dropping (End Id)
  const handleDrop = (targetId) => {
    if (draggedId === null || draggedId === targetId || targetId===null) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const draggedIndex = data.findIndex((item) => item.id === draggedId);
    const targetIndex = data.findIndex((item) => item.id === targetId);

    const updatedItems = [...data];

    const [draggeItem] = updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggeItem);

    setData(updatedItems);
    setDraggedId(null);
    setDragOverId(null);
  };

  // handle Delete
  // Delete API call
  const deleteApiCall = async (id) => {
    try {
      setLoading(true);
      const response = await del(`tasks/${id}`);
      if (response) {
        toast.success("Task Deleted successfully!");
        setRefreshPoint((prev) => !prev);
        setDeletingId(null);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // intention delay for animation
  const handleDelete = async (id) => {
    setDeletingId(id);
    setTimeout(() => {
      deleteApiCall(id);
    }, 300);
  };

  // handle Edit Logic with API call
  const handleEdit = (id) => {
    // find returns an object
    const dataItem = data.find((item) => item.id === id);
    console.log(dataItem);
    setEditData(() => dataItem);
  };

  // Get Request for latest data
  const fetchData = async () => {
    try {
      const response = await get("tasks");
      setData(response);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [refreshPoint]);

  return (
    <>
      {/* Modal */}
      <TaskModal
        handleClose={closeModal}
        open={open}
        taskData={editData}
        mode={mode}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          marginX: "20px",
        }}
      >
        {/* Add Button */}
        <Box sx={{ marginTop: "20px" }}>
          <ControlPointIcon
            sx={{
              color: "white",
              cursor: "pointer",
              fontSize: "2rem",
              ":hover": {
                transform: "scale(1.2)",
              },
            }}
            onClick={() => openModal("add")}
          />
        </Box>
        {/* Cards */}
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {data.map((item, index) => {
            return (
              // Delete Animation
              <Box
                key={item.id}
                sx={{
                  transition: "all 0.3s ease",
                  opacity: deletingId === item.id ? 0 : 1,
                  transform:
                    deletingId === item.id
                      ? "translateY(-20px)"
                      : "translateY(0)",
                  pointerEvents: deletingId === item.id ? "none" : "auto",
                }}
              >
                <TaskCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  onDragStart={() => handleDragStart(item.id)}
                  onDragOver={(e) => handleDragOver(e, item.id)}
                  onDrop={() => handleDrop(item.id)}
                  onDragEnd={handleDragEnd}
                  isDragOver={dragOverId === item.id}
                  isDragging={draggedId === item.id}
                  onDelete={() => handleDelete(item.id)}
                  onEdit={() => {
                    handleEdit(item.id);
                    openModal("edit");
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default MainComponent;
