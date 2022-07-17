import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";

export const CustomField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid " + theme.palette.success.main,
      borderRadius: "8px",
    },
    // "&.Mui-focused fieldset": {
    //   border: "1px solid " + theme.palette.success.main,
    // },
  },
}));

const CustomTextField = (props) => {
  const theme = useTheme();
  const height = 38;
  return (
    <CustomField
      onChange={props.onChange}
      size="small"
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon
              sx={{
                color: theme.palette.text.secondary,
              }}
            />
          </InputAdornment>
        ),
        style: {
          height,
          padding: "0 14px",
        },
      }}
      /* styles the label component */
      InputLabelProps={{
        style: {
          height,
        },
      }}
      fullWidth
      placeholder="Search any product"
      variant="outlined"
      color="success"
    />
  );
};

export default CustomTextField;
