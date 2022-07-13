import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  width: "120px",
  fontSize: "0.8rem",
  [theme.breakpoints.down("md")]: {
      width: "100px",
      fontSize: "0.6rem",
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
