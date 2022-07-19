import { Grid, Box, Paper } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";
import CustomButton from "../components/CustomButton";
import { Title } from "../layouts/RetailDashboard";
import { decodeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const RetailDashboard = () => {
  const navigate = useNavigate();
  const user = decodeToken();

  React.useEffect(() => {
    if (!user) {
      localStorage.clear();
      navigate(`/auth?redirect=${window.location.pathname}`);
    }
  }, [navigate, user]);

  let products = localStorage.getItem("products");
  products = JSON.parse(products);

  if (products === null || products.length === 0) {
    products = [];
    return (
      <h3 style={{ textAlign: "center", margin: "15px 0" }}>
        No checklist requested!
      </h3>
    );
  }

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7}>
          <Box
            sx={{
              display: "flex",
              mb: "20px",
            }}
          >
            <Paper
              variant="outlined"
              sx={{
                px: 2,
                my: 2,
                borderRadius: "10px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Title variant="h6" sx={{ margin: "10px 0" }}>
                  My checklist
                </Title>
                <CustomButton title={"Place Order"} />
              </Box>
            </Paper>
          </Box>

          <Box sx={{ height: "70vh", overflow: "auto" }}>
            {products.map((product, i) => (
              <ProductCard
                key={i}
                product={{
                  ...product,
                  condition: "Brand New",
                  location: "Dubai",
                  status: "In checking",
                }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RetailDashboard;
