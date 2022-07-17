import React from "react";
import { Snackbar, Alert } from "@mui/material";

const SnackbarNotify = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={3000}
      onClose={props.close}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={props.color}>{props.message}</Alert>
    </Snackbar>
  );
};

export default SnackbarNotify;
