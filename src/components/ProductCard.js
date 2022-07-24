import React from "react";
import { Checkbox, Paper, Typography, Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
// import { styled } from "@mui/material/styles";

// const StatusText = styled(Typography)(({ theme }) => ({
//   color: "#13B555",
//   backgroundColor: `rgba(19, 181, 85, 0.09)`,
//   position: "absolute",
//   top: 0,
//   right: 0,
//   textAlign: "center",
//   padding: "0 1rem",
//   borderRadius: "0 10px 0 10px",
//   fonsize: "0.5rem",
// }));

const ProductCard = (props) => {
  const theme = useTheme();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return "#2ECC71";
      case "not available":
        return "#AB0000";
      case "out of stock":
        return "#D4AC0D";
      default:
        return "#34495E";
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        mb: "20px",
        mr: "20px",
      }}
    >
      <Checkbox
        value={props.checked}
        icon={<CheckBoxOutlineBlankIcon color="success" />}
        checkedIcon={<CheckBoxIcon color="success" />}
        onChange={props.onChange}
      />
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: "10px",
          position: "relative",
          width: "100%",
          border: `1px solid ${getStatusColor(props.product.status)}`,
        }}
      >
        {/* {props.product.status ? (
          props.product.status === "Available" ? (
            <StatusText>{props.product.status}</StatusText>
          ) : (
            <StatusText
              sx={{
                color: "#AB0000",
                backgroundColor: `rgba(171, 0, 0, 0.09)`,
              }}
            >
              {props.product.status}
            </StatusText>
          )
        ) : (
          ""
        )} */}

        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginTop: "8px",
          }}
        >
          {props.product.condition} {props.product.name} -{" "}
          <span style={{ fontWeight: 300 }}>{props.product.city}</span>
        </Typography>
        <Typography
          sx={{
            fontSize: ".9rem",
            mb: "5px",
            color: theme.palette.text.secondary,
          }}
        >
          {props.product.specifications}
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            color: theme.palette.success.main,
          }}
        >
          {props.currency}{" "}
          {props.loading ? "..." : `${props.product.price} + VAT`}
        </Typography>
        <Typography
          sx={{
            fontSize: ".9rem",
            color: theme.palette.text.secondary,
          }}
        >
          {props.product.tag_code} -{" "}
          <a
            style={{
              textDecoration: "underline",
              color: theme.palette.text.secondary,
            }}
            href={props.product.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            rateckstores.com
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default ProductCard;
