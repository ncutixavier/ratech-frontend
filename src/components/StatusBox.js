import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Status = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  textAlign: "center",
  padding: "0 1rem",
  borderRadius: "10px 0 0 0",
  fonsize: "0.5rem",
  fontWeight: "bold",
  color: "#fff",
}));

const StatusBox = (props) => {
  return (
    <div>
      {props.status === "Available" ? (
        <Status
          sx={{
            backgroundColor: `rgba(34, 153, 84)`,
          }}
        >
          {props.status}
        </Status>
      ) : props.status === "Out of Stock" ? (
        <Status
          sx={{
            backgroundColor: `rgba(171, 0, 0)`,
          }}
        >
          {props.status}
        </Status>
      ) : (
        <Status
          sx={{
            backgroundColor: `rgba(52, 152, 219)`,
          }}
        >
          {props.status}
        </Status>
      )}
    </div>
  );
};

export default StatusBox;
