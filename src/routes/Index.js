import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Auth from "../layouts/Auth";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      text: "#000000",
      contrast: "#ccc",
    },
    secondary: {
      main: "#f5f5f5",
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
    },
  },
  typography: {
    fontFamily: `"Work Sans", "Helvetica", "Arial", sans-serif`,
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default Index;
