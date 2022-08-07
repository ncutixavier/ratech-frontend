import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Auth from "../layouts/Auth";
import RetailDashboard from "../layouts/RetailDashboard";
import Login from "../pages/Login";
import RecoverPassword from "../pages/RecoverPassword";
import ResetPassword from "../pages/ResetPassword";
import Retail from "../pages/Retail";
import ChecklistOrder from "../pages/ChecklistOrder";
import ProtectRoute from "./ProtectRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "../pages/Profile";

const theme = createTheme({
  palette: {
    success: { main: "#3652B4" },
    primary: {
      main: "#1d2121",
      text: "#000000",
      contrast: "#3652B4",
    },
    secondary: {
      main: "#cccccc",
      text: "#888888",
    },
    error: {
      main: "#C32200",
    },
    warning: {
      main: "#ff9800",
    },
    text: {
      primary: "#000000",
      secondary: "#888888",
      light: "#ffffff",
    },
  },
  typography: {
    fontFamily: `"Nunito", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const Index = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/retail" element={<Retail />} />
          <Route path="/auth" element={<Auth />}>
            <Route path="" element={<Login />} />
            <Route path="recover-password" element={<RecoverPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>
          <Route element={<ProtectRoute />}>
            <Route path="/retail" element={<RetailDashboard />}>
              <Route path="" element={<Retail />} />
              <Route path="checklist" element={<ChecklistOrder />} />
            </Route>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default Index;
