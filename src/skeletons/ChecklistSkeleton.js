import React from "react";
import { Paper, Skeleton, Box } from "@mui/material";

const ChecklistSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, index) => (
        <Box
          sx={{
            display: "flex",
            mb: "20px",
          }}
          key={index}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: "10px",
              borderRadius: "10px",
              position: "relative",
              width: "100%",
            }}
          >
            <Skeleton animation="wave" />
          </Paper>
        </Box>
      ))}
    </div>
  );
};

export default ChecklistSkeleton;
