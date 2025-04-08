/* eslint-disable no-unused-vars */
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const TaskCard = ({
  title,
  description,
  onDragStart,
  onDragOver,
  onDrop,
  isDragOver,
  isDragging,
  onEdit,
  onDelete,
  onDragEnd
}) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        maxHeight: 400,
        backgroundColor: "#2a2a2a",
        color: "#f0f0f0",
        overflow: "auto",
        paddingX: "10px",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: isDragOver ? "scale(1.04)" : "scale(1)",
        boxShadow: isDragOver
          ? "10px 10px 10px 2px rgba(253, 253, 253, 0.2)"
          : "none",
        "&:hover .card-actions": {
          visibility: "visible",
        },
        ":hover": {
          transform: "scale(1.02)",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
        },
      }}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      draggable
    >
      <CardHeader title={title} />
      <CardContent>
        <Typography variant='body2'>{description}</Typography>
      </CardContent>
      <CardActions
        className='card-actions'
        sx={{
          visibility: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          columnGap: "10px",
          padding: "4px",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      >
        <ModeEditIcon
          sx={{
            cursor: "pointer",
            ":hover": {
              transform: "scale(1.2)",
            },
          }}
          onClick={onEdit}
        />
        <DeleteForeverIcon
          sx={{
            cursor: "pointer",
            ":hover": {
              transform: "scale(1.2)",
            },
          }}
          onClick={onDelete}
        />
      </CardActions>
    </Card>
  );
};

export default TaskCard;
