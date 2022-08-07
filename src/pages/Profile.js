import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import RetailHeader from "../components/RetailHeader";
import EditProfile from "../components/EditProfile";
import ChangePassword from "../components/ChangePassword";
import Avatar from "@mui/material/Avatar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
}));

const Profile = () => {
  const [edit, setEdit] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);

  const handleEdit = () => {
    setEdit(!edit);
    setChangePassword(false);
  };

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
    setEdit(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <RetailHeader />
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
        sx={{ mt: 2, p: 2 }}
      >
        <Grid item xs={12} sm={12} md={4}>
          <Item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "black", width: 70, height: 70, mr: 2 }}>
                N
              </Avatar>
              <Box>
                <Typography variant="h6">Nama Weba</Typography>
                <Typography>NamaWeba@gmail.com</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <Button
                size="medium"
                color="success"
                sx={{ mr: 3 }}
                onClick={handleEdit}
              >
                Edit Profile
              </Button>
              <Button
                size="medium"
                color="success"
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </Box>
          </Item>
        </Grid>
        {edit || changePassword ? (
          <Grid item xs={12} sm={12} md={4}>
            <Item>
              {edit && <EditProfile />}
              {changePassword && <ChangePassword />}
            </Item>
          </Grid>
        ) : null}
      </Grid>
      {/* <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        justifyContent="center"
        sx={{ p: 2 }}
      >
        <Grid item xs={12} sm={12} md={4}>
          <Item>
            <EditProfile />
          </Item>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default Profile;
