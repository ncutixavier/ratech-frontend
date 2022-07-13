import { Grid, Box, InputAdornment } from "@mui/material";
import React from "react";
import products from "../assets/data.json";
import ProductCard from "../components/ProductCard";
import CustomTextField, { CustomField } from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Title } from "../layouts/RetailDashboard";
import { useNavigate } from "react-router-dom";
import SelectSmall from "../components/SelectSmall";
import { useTheme } from "@emotion/react";

const RetailDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleSelectProducts = (selected, product) => {
    setChecked(selected.target.checked);
    const currentSelectedItems = selectedItems;
    if (selected.target.checked) {
      currentSelectedItems.push(product);
      setSelectedItems(currentSelectedItems);
    } else {
      const index = currentSelectedItems.indexOf(product);
      currentSelectedItems.splice(index, 1);
      setSelectedItems(currentSelectedItems);
    }
    console.log(selected.target.checked, selectedItems);
  };

  const handleRequest = (request) => {
    console.log(request);
    if (request.toLowerCase() === "check" && selectedItems.length > 0) {
      localStorage.setItem("products", JSON.stringify(selectedItems));
      navigate("checklist");
    }
  };

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7}>
          <Box sx={{ mb: 3, mt: 2 }}>
            <Title variant="h4">Rateck Live Stock</Title>
            <CustomTextField />
          </Box>
          <Grid
            container
            flexDirection="row"
            justifyContent="center"
            spacing={2}
            sx={{ mb: "20px" }}
          >
            <Grid item xs={4} md={2}>
              <SelectSmall
                label="Sort"
                items={["High to Low Price", "High to Low Price"]}
              />
            </Grid>
            <Grid item xs={4} md={2}>
              <SelectSmall label="Currency" items={["USD", "AED"]} />
            </Grid>
            <Grid item xs={4} md={2}>
              <CustomField
                sx={{
                  width: "120px",
                  [theme.breakpoints.down("md")]: {
                    width: "105px",
                    fontSize: "0.7rem",
                  },
                }}
                label="Margin"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">%</InputAdornment>
                  ),
                }}
                /* styles the label component */
                InputLabelProps={{
                  style: {
                    height: "35px",
                  },
                }}
                /* styles the input component */
                inputProps={{
                  style: {
                    height: "35px",
                    padding: "0 14px",
                  },
                }}
                fullWidth
                placeholder="Margin"
                variant="outlined"
                color="success"
              />
            </Grid>

            {["Quote", "Check", "Place Order"].map((item, index) => (
              <Grid item xs={4} md={2} key={index}>
                <CustomButton
                  title={item}
                  onClick={() => handleRequest(item)}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ height: "60vh", overflow: "auto" }}>
            {products.map((product, index) => (
              <ProductCard
                product={product}
                checked={checked}
                onChange={(selected) => handleSelectProducts(selected, product)}
                key={index}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RetailDashboard;
