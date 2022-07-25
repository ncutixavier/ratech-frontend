import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchNotFound = () => {
  return (
    <Paper variant="">
      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchIcon color="secondary" style={{ fontSize: 150 }} />
        {/* <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#888", mb: 2 }}
        >
          Ooops!
        </Typography> */}
        <Typography
          sx={{color: "#888", textAlign: "center" }}
        >
          {/* We couldn't find any product matching your search */}
          Try to search product based on the name, specifications, ...
        </Typography>
      </Box>
    </Paper>
  );
};

export default SearchNotFound;
