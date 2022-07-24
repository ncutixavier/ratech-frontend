import React from "react";
import { Snackbar, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingSnackbar = (props) => {
  return (
    <Snackbar
      open={props.open}
      onClose={props.close}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        ariant="outlined"
        severity="success"
        iconMapping={{
          success: <CircularProgress size={15} />,
        }}
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
};

export default LoadingSnackbar;
