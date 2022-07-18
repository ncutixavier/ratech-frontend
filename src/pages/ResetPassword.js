import React from "react";
import { Box, TextField, CircularProgress } from "@mui/material";
import { FormTitle, TextLabel, FieldGroup } from "../layouts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../validations";
import { useTheme } from "@emotion/react";
import { InputAdornment, IconButton, Button } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { resetPassword } from "../features/auth/ResetPasswordSlice";
import { useNavigate } from "react-router-dom";
import SnackbarNotify from "../components/Snackbar";

const ResetPassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitted(true);
      const payload = {
        password: data.password,
        otp: data.code,
        email: localStorage.getItem("email"),
      };
      const response = await dispatch(resetPassword(payload)).unwrap();
      if (response.status === 200) {
        setSuccess(response.data.message);
        setOpenSuccess(true);
        setTimeout(() => {
          setIsSubmitted(false);
          navigate("/auth");
        }, 1500);
      }
    } catch (error) {
      setError(error.data.message);
      setOpen(true);
      setIsSubmitted(false);
    }
  };

  return (
    <Box>
      <SnackbarNotify
        open={open}
        close={() => setOpen(false)}
        color={"error"}
        message={error}
      />
      <SnackbarNotify
        open={openSuccess}
        close={() => setOpenSuccess(false)}
        color={"success"}
        message={success}
      />
      <FormTitle>Reset Password</FormTitle>
      <FieldGroup>
        <TextLabel>Password</TextLabel>
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
      </FieldGroup>

      <FieldGroup>
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
      </FieldGroup>

      <FieldGroup>
        <TextLabel>Code</TextLabel>
        <TextField
          fullWidth
          size="small"
          name="code"
          control={control}
          {...register("code")}
          error={errors.code ? true : false}
        />
        <Box
          sx={{
            color: theme.palette.text.secondary,
            textAlign: "right",
            fontSize: "0.9rem",
            marginBottom: "1rem",
          }}
        >
          {localStorage.getItem("email") ? (
            <span>
              code sent to <u>{localStorage.getItem("email")}</u>
            </span>
          ) : null}
        </Box>
      </FieldGroup>

      <FieldGroup>
        <Button
          sx={{
            marginY: theme.spacing(2),
            height: "2.8rem",
          }}
          color="primary"
          variant="contained"
          fullWidth
          onClick={handleSubmit(onSubmit)}
          disableElevation
        >
          {isSubmitted ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            "Save"
          )}
        </Button>
      </FieldGroup>
    </Box>
  );
};

export default ResetPassword;
