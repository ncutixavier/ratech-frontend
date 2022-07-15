import * as React from "react";
import { InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  borderRadius: "8px",
  width: "120px",
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: "8px",
  height: "35px",
  "& .MuiOutlinedInput": {
    "&-notchedOutline": {
      borderColor: theme.palette.success.main,
    },
  },
}));

export default function SelectSmall(props) {
  return (
    <StyledFormControl size="small" success="true">
      <InputLabel>{props.label || ""}</InputLabel>
      <StyledSelect
        value={props.value}
        label={props.label || ""}
        onChange={props.onChange}
        defaultValue=""
      >
        {props.items.map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
}
