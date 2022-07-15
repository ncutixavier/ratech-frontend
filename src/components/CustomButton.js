import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  width: "120px",
  fontSize: "0.8rem",
  border: "1px solid " + theme.palette.success.main,
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
    height: "34px",
  },
}));

const CustomButton = (props) => {
  return (
    <StyledButton variant="outlined" color="success" onClick={props.onClick}>
      {props.title}
    </StyledButton>
  );
};

export default CustomButton;
