import React from "react";
import { Avatar, Typography, Menu, Badge, MenuItem, Box } from "@mui/material";
import logoDark from "../assets/images/logo.png";
import { useTheme } from "@emotion/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";

const RetailHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
            }}
          >
            <Link to="/retail">
              <Avatar
                alt="Logo"
                src={logoDark}
                sx={{
                  width: 180, height: 70,
                  [theme.breakpoints.down("md")]: {
                    width: 130,
                   }
                }}
              />
            </Link>
          </Box>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={17} color="error">
              <NotificationsIcon fontSize="40" />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.text.light,
              }}
            >
              <Typography>N</Typography>
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={()=>navigate("checklist")}>Checklist</MenuItem>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default RetailHeader;
