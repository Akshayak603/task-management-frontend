/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customValidation } from "../../../utils/helper";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import useApi from "../../../api/useApi";
import { BASE_URL } from "../../../utils/constant";
import { toast } from "react-toastify";
import { DataContext } from "../../../context/DataContext";

const ModalForm = ({ editData, mode, close }) => {
  // Uncontrolled Forms via react hook  forms
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customValidation),
    defaultValues: editData || [],
  });

  // For Api calls and latest data checkpoint
  const { patch, post } = useApi(BASE_URL);
  const { setRefreshPoint, setLoading } = useContext(DataContext);

  const onSumbit = async (data) => {
    setLoading(true);
    if (mode === "edit" && editData) {
      try {
        const response = await patch(`tasks/${editData.id}`, data);
        if (response) {
          toast.success("Task edited successfully!");
          setRefreshPoint((prev) => !prev);
        }
      } catch (error) {
        toast.error("Error editing task");
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await post(`tasks`, data);
        if (response) {
          toast.success("Task created successfully!");
          setRefreshPoint((prev) => !prev);
        }
      } catch (error) {
        toast.error("Error while creating Task");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    close();
  };

  useEffect(() => {
    if (mode === "edit" && editData) {
      Object.keys(editData).forEach((key) => {
        setValue(key, editData[key]);
      });
    }
  }, [mode, editData, setValue]);

  return (
    <Box sx={{ backgroundColor: "transparent" }}>
      <form onSubmit={handleSubmit(onSumbit)}>
        <Typography
          variant='h3'
          sx={{ fontSize: "1rem", marginBottom: "0.5rem", color: "#f5f5f5" }}
        >
         {mode.charAt(0).toUpperCase()+mode.slice(1)} Task 
        </Typography>
        <Divider sx={{ backgroundColor: "rgb(14, 241, 241)", mb: 2 }} />

        {/* Title and Description */}
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "12px" }}>
          {/* Title */}
          <Box>
            <Typography sx={{ fontSize: "0.8rem", mb: 0.2, color: "#f5f5f5" }}>
              Title :
            </Typography>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Enter your title'
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              type='text'
              sx={{
                input: {
                  color: "#f5f5f5",
                  "::placeholder": {
                    color: "#f5f5f5",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(61, 58, 58)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(61, 58, 58)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(36, 189, 203)",
                  },
                },
              }}
            />
          </Box>
          {/* Description */}
          <Box>
            <Typography sx={{ fontSize: "0.8rem", mb: 0.2, color: "#f5f5f5" }}>
              Description :
            </Typography>
            <TextField
              fullWidth
              multiline
              maxRows={7}
              variant='outlined'
              placeholder='Enter your description'
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              type='text'
              sx={{
                textArea: {
                  color: "#f5f5f5",
                  "::placeholder": {
                    color: "#f5f5f5",
                    opacity: 1,
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgb(61, 58, 58)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgb(61, 58, 58)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "rgb(36, 189, 203)",
                  },
                },
              }}
            />
          </Box>
          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.5rem",
              mt: 2,
            }}
          >
            <Button
              variant='contained'
              type='submit'
              sx={{
                backgroundColor: "#24bdcb",
                color: "#fff",
                ":hover": {
                  backgroundColor: "#1aa4b2",
                },
              }}
            >
              {mode === "edit" ? "Edit Task" : "Add Task"}
            </Button>
            <Button
              variant='contained'
              onClick={close}
              sx={{
                backgroundColor: "#333",
                color: "#ccc",
                ":hover": {
                  backgroundColor: "#444",
                  color: "#fff",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ModalForm;
