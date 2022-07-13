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
    width: "105px",
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
    <StyledFormControl size="small" success>
      <InputLabel id="demo-select-small">{props.label || ""}</InputLabel>
      <StyledSelect
        labelId="demo-select-small"
        id="demo-select-small"
        value={props.value}
        label={props.label || ""}
        onChange={props.onChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {(props.items || []).map((item, index) => (
          <MenuItem value={item} key={index}>
            {item}
          </MenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  );
}
