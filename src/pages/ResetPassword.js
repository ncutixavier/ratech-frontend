import React from "react";
import { Box, TextField, CircularProgress } from "@mui/material";
import { FormTitle, TextLabel, FieldGroup } from "../layouts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordSchema } from "../validations";
import { useTheme } from "@emotion/react";
import { InputAdornment, IconButton, Button } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

const ResetPassword = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
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

  const onSubmit = (data) => {
    setIsSubmitted(true);
    console.log(data);
  };

  return (
    <Box>
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
