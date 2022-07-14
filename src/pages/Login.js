import React from "react";
import { Box, TextField, CircularProgress } from "@mui/material";
import { FormTitle, TextLabel, FieldGroup } from "../layouts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validations";
import { useTheme } from "@emotion/react";
import { InputAdornment, IconButton, Button } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { showErrorMessage } from "../utils/toast";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/LoginSlice";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitted(true);
      const res = await dispatch(login(data)).unwrap();
      if (res.status === 200) {
        setIsSubmitted(false);
        if (res.data.user.role === "employee") {
          navigate("/employee");
        } else if(res.data.user.role === "admin") {
          navigate("/admin");
        }
      }
    } catch (err) {
      showErrorMessage(err.data.message);
      setIsSubmitted(false);
    }
  };

  return (
    <Box>
      <FormTitle>Sign in to continue</FormTitle>
      <FieldGroup>
        <TextLabel>Email</TextLabel>
        <TextField
          fullWidth
          size="small"
          name="email"
          control={control}
          {...register("email")}
          error={errors.email ? true : false}
          helperText={errors.email ? errors.email.message : null}
        />
      </FieldGroup>
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
            "Login"
          )}
        </Button>
      </FieldGroup>
      <Box
        sx={{
          margin: "1.5rem 0",
          fontSize: "1rem",
          textAlign: "center",
        }}
      >
        <Link
          to="/auth/recover-password"
          style={{
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
        >
          Forgot password?
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
