import React from "react";
import RetailHeader from "../components/RetailHeader";
import { Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Title = styled(Typography)(({ theme }) => ({
  margin: "30px 0",
  color: theme.palette.primary.main,
  textAlign: "center",
}));

const Retail = () => {
  return (
    <div>
      <RetailHeader />
      <Outlet />
    </div>
  );
};

export default Retail;
