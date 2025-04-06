/* eslint-disable no-unused-vars */
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import TaskCard from "./TaskComponents/TaskCard";
import { Box } from "@mui/material";
import { useState } from "react";
import TaskModal from "./TaskComponents/TaskModal";

const MainComponent = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Task-1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry"   },
    {
      id: 2,
      title: "Task-2",
      description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      id: 3,
      title: "Task-3",
      description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      id: 4,
      title: "Task-4",
      description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      id: 5,
      title: "Task-5",
      description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ]);

  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [editData, setEditData]= useState(null);
  const [mode, setMode]= useState('add')

  // Modal
  const [open, setOpen]= useState(false);

  const openModal=(mode)=>{
    setOpen(true);
    setMode(mode);
  }

  const closeModal=()=>{
    setOpen(false);
  }

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

  // Target Id of a card where we are dropping (End Id)
  const handleDrop = (targetId) => {
    if (draggedId == null || draggedId === targetId) {
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
  const handleDelete=()=>{
    console.log("deleted!!");
  }

  // handle Edit
  const handleEdit=(id)=>{
    // find returns an object
    const dataItem= data.find((item)=> item.id===id);
    console.log(dataItem)
    setEditData(()=> dataItem);
  }

  return (<>
  {/* Modal */}
  <TaskModal handleClose={closeModal} open={open} taskData={editData} mode={mode}/>
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
        <ControlPointIcon sx={{ color: "white", cursor:"pointer", fontSize: '2rem',
            ":hover":{
                transform: "scale(1.2)"
            }
         }} onClick={()=>openModal('add')}/>
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
            <TaskCard
              key={item.id}
              title={item.title}
              description={item.description}
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={(e) => handleDragOver(e, item.id)}
              onDrop={() => handleDrop(item.id)}
              isDragOver={dragOverId === item.id && dragOverId != draggedId}
              isDragging={draggedId === item.id}
              onDelete={handleDelete}
              onEdit={()=>{
                handleEdit(item.id);
                openModal('edit');
              }}
            />
          );
        })}
      </Box>
    </Box>
    </>
  );
};

export default MainComponent;
