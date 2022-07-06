import * as React from "react";
import { Typography,Box, Grid, Paper } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import logoDark from "../assets/images/logo-dark.png";
import { styled } from "@mui/material/styles";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2.5),
  margin: theme.spacing(1),
  boxShadow: theme.shadows[0],
  border: "1px solid #ccc",
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.secondary.text,
  margin: theme.spacing(1.3, 0, 3.5, 0),
  fontSize: theme.typography.fontSize * 1.3,
  textAlign: "center",
}));

export const TextLabel = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.secondary.text,
  marginBottom: theme.spacing(1),
  fontSize: theme.typography.fontSize * 1.2,
}));

export const FieldGroup = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2.5, 0),
  height: "4.7rem",
}));



export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => { 
    if (location.pathname === "/") {
      navigate("/auth");
    }
  }, [location.pathname, navigate]);
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Item>
          <Box display="flex"
            flexDirection="column"
            alignItems="center" justifyContent="center">
            <Avatar
              alt="Logo"
              src={logoDark}
              sx={{ width: 250, height: 150 }}
            />
            <Typography variant="h4" component="h2">
              Rateck Live Stock
            </Typography>
          </Box>

          <Outlet />
        </Item>
      </Grid>
    </Grid>
  );
}
