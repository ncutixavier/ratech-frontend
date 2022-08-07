import React from "react";
import { Box, Typography, Alert, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileSchema } from "../validations";
import { TextLabel } from "../layouts/Auth";
import { InputAdornment, IconButton } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/auth/ResetPasswordSlice";
import { useNavigate } from "react-router-dom";
import SnackbarNotify from "../components/Snackbar";
import SyncLockIcon from "@mui/icons-material/SyncLock";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
  return (
    <div>
      <Alert
        variant="outlined"
        iconMapping={{
          success: <SyncLockIcon fontSize="inherit" />,
        }}
      >
        <Typography>Change password</Typography>
      </Alert>
      <Box sx={{ mt: 2 }}>
        <TextLabel>Current Password</TextLabel>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? (
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          size="small"
          name="password"
          type={showPassword ? "text" : "password"}
          control={control}
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password.message : null}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextLabel>New Password</TextLabel>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? (
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          size="small"
          name="password"
          type={showPassword ? "text" : "password"}
          control={control}
          {...register("password")}
          error={errors.password ? true : false}
          helperText={errors.password ? errors.password.message : null}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextLabel>Confirm Password</TextLabel>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword} edge="end">
                  {showPassword ? (
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          size="small"
          name="confirmPassword"
          type={showPassword ? "text" : "password"}
          control={control}
          {...register("confirmPassword")}
          error={errors.confirmPassword ? true : false}
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : null
          }
        />
      </Box>
      <Button variant="contained" sx={{ mt: 2, width: "120px" }}>
        Save
      </Button>
    </div>
  );
};

export default ChangePassword;
