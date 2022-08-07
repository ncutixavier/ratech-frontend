import React from "react";
import { Box, Typography, Alert, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../validations";
import { TextLabel } from "../layouts/Auth";

const EditProfile = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  setValue("email", "test@gmail.com");
  const onSubmit = (data) => {};

  return (
    <div>
      <Alert
        variant="outlined"
        iconMapping={{
          success: <EditIcon fontSize="inherit" />,
        }}
      >
        <Typography>Edit profile</Typography>
      </Alert>
      <Box sx={{ mt: 2 }}>
        <TextField
          disabled
          fullWidth
          size="small"
          name="email"
          control={control}
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email ? errors.email.message : null}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <TextLabel sx={{ mb: 1 }}>Phone</TextLabel>
        <TextField
          disabled
          fullWidth
          size="small"
          name="phone"
          control={control}
          {...register("phone")}
          error={errors.phone ? true : false}
          helperText={errors.phone ? errors.phone.message : null}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <TextLabel sx={{ mb: 1 }}>Name</TextLabel>
        <TextField
          disabled
          fullWidth
          size="small"
          name="first_name"
          control={control}
          {...register("first_name")}
          error={errors.first_name ? true : false}
          helperText={errors.first_name ? errors.first_name.message : null}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <TextLabel sx={{ mb: 1 }}>Country</TextLabel>
        <TextField
          disabled
          fullWidth
          size="small"
          name="country"
          control={control}
          {...register("country")}
          error={errors.country ? true : false}
          helperText={errors.country ? errors.country.message : null}
        />
      </Box>
      <Box sx={{ mt: 1 }}>
        <TextLabel sx={{ mb: 1 }}>City</TextLabel>
        <TextField
          disabled
          fullWidth
          size="small"
          name="city"
          control={control}
          {...register("city")}
          error={errors.city ? true : false}
          helperText={errors.city ? errors.city.message : null}
        />
      </Box>
      <Button variant="contained" sx={{ mt: 2, width: "120px" }}>
        Save
      </Button>
    </div>
  );
};

export default EditProfile;
