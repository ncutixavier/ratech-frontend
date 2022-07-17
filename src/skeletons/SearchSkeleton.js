import React from "react";
import { Paper, Skeleton, Box } from "@mui/material";

const SearchSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
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
              mb: "20px",
              borderRadius: "10px",
              position: "relative",
              width: "100%",
            }}
          >
            <Skeleton animation="wave" />
            <Skeleton animation="wave" sx={{ width: 400 }} />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" sx={{ width: 400 }} />
          </Paper>
        </Box>
      ))}
    </div>
  );
};

export default SearchSkeleton;
