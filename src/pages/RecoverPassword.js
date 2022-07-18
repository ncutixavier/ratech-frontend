import React from "react";
import { Box, TextField, CircularProgress } from "@mui/material";
import { FormTitle, TextLabel, FieldGroup } from "../layouts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverPasswordSchema } from "../validations";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import SnackbarNotify from "../components/Snackbar";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../features/auth/ForgotPasswordSlice";

const RecoverPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    resolver: yupResolver(recoverPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitted(true);
      const response = await dispatch(forgotPassword(data)).unwrap();
      if (response.status === 200) {
        setSuccess(response.data.message);
        setOpenSuccess(true);
        setTimeout(() => {
          setIsSubmitted(false);
          navigate("/auth/reset-password");
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
      <FormTitle>Forgot Password</FormTitle>
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
            "Send"
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
          to="/auth"
          style={{
            color: theme.palette.primary.main,
            textDecoration: "none",
          }}
        >
          Back to login
        </Link>
      </Box>
    </Box>
  );
};

export default RecoverPassword;
