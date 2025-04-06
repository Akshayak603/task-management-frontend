/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { customValidation } from "../../../utils/helper";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { useEffect } from "react";

const ModalForm = ({editData, mode}) => {
  // Uncontrolled Forms
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customValidation),
    defaultValues: editData || [],
  });

  const onSumbit = () => {
    console.log("form is submitted");
  };

  useEffect(()=>{
    if(mode==='edit' && editData){
        Object.keys(editData).forEach((key)=>{
            setValue(key, editData[key])
        })
  }
},[mode, editData, setValue]);

  return (
    <Box sx={{ backgroundColor: "transparent" }}>
      <form onSubmit={handleSubmit(onSumbit)}>
        <Typography
          variant='h3'
          color="error"
          sx={{ fontSize: "1rem", marginBottom: "0.5rem" }}
        >
          Modal Form
        </Typography>
        <Divider sx={{ backgroundColor: "rgb(14, 241, 241)", mb: 2 }} />

        {/* Title and Description */}
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "12px" }}>
          {/* Title */}
          <Box>
            <Typography color="error" sx={{ fontSize: "0.8rem", mb: 0.2 }}>
              Title :
            </Typography>
            <TextField
              fullWidth
              variant='outlined'
              placeholder='Enter your title'
              {...register("title")}
              error={!!errors.name}
              helperText={errors.name?.message}
              type='text'
              sx={{
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
            <Typography color="error" sx={{ fontSize: "0.8rem", mb: 0.2 }}>
              Description :
            </Typography>
            <TextField
              fullWidth
              multiline
              maxRows={7}
              variant='outlined'
              placeholder='Enter your description'
              {...register("description")}
              error={!!errors.name}
              helperText={errors.name?.message}
              type='text'
              sx={{
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap:"0.5rem", mt: 2}}>
            <Button variant="contained" color="error" type="submit">Add Task</Button>
            <Button variant="contained" color="error" onClick={()=>console.log('Cancel Clicked!')}>Cancel</Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ModalForm;
