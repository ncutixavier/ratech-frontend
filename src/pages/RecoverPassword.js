import React from "react";
import { Box, TextField, CircularProgress } from "@mui/material";
import { FormTitle, TextLabel, FieldGroup } from "../layouts/Auth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recoverPasswordSchema } from "../validations";
import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RecoverPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recoverPasswordSchema),
  });

  const onSubmit = (data) => {
    setIsSubmitted(true);
    console.log(data);
    localStorage.setItem("email", data.email);
    navigate("/auth/reset-password");
  };

  return (
    <Box>
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
    </Box>
  );
};

export default RecoverPassword;
