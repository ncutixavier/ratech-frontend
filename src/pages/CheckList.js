import { Grid, Box } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";
import CustomButton from "../components/CustomButton";
import { Title } from "../layouts/RetailDashboard";

const RetailDashboard = () => {
  let products = localStorage.getItem("products");
  products = JSON.parse(products);

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7}>
          <Box
            sx={{
              mb: 1,
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Title variant="h4">My checklist</Title>
            <CustomButton title={"Place Order"} />
          </Box>
          <Box sx={{ height: "70vh", overflow: "auto" }}>
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RetailDashboard;
