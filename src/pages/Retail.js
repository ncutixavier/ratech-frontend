import { Grid, Box, InputAdornment } from "@mui/material";
import React from "react";
import products from "../assets/data.json";
import ProductCard from "../components/ProductCard";
import CustomTextField, { CustomField } from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Title } from "../layouts/RetailDashboard";
import { useNavigate } from "react-router-dom";
import SelectSmall from "../components/SelectSmall";
// import { useTheme } from "@emotion/react";

const RetailDashboard = () => {
  // const theme = useTheme();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [currency, setCurrency] = React.useState("USD");
  const [currencyRate, setCurrencyRate] = React.useState(1);
  const [allProducts, setAllProducts] = React.useState([...products]);

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
  };

  const handleRequest = (request) => {
    console.log(request);
    if (request.toLowerCase() === "check" && selectedItems.length > 0) {
      localStorage.setItem("products", JSON.stringify(selectedItems));
      navigate("checklist");
    }
  };

  const handleChangeSort = (e) => { 
    if (/lowest/.test(e.target.value.toLowerCase())) {
      setAllProducts([...products].sort((a, b) => a.price - b.price));
    } else if (/highest/.test(e.target.value.toLowerCase())) { 
      setAllProducts([...products].sort((a, b) => b.price - a.price));
    }
  }

  React.useEffect(() => {
    fetch("https://cdn.moneyconvert.net/api/latest.json")
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[currency];
        setCurrencyRate(rate);
      });
  }, [currency]);

  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7}>
          <Box sx={{ mb: 1, mt: 2 }}>
            <Title variant="h4">Rateck Live Stock</Title>
            <CustomTextField />
          </Box>
          <Box>
            <Grid
              container
              flexDirection="row"
              justifyContent="space-between"
              sx={{ mb: "20px" }}
            >
              <Box sx={{ mt: 1 }}>
                <SelectSmall
                  label="Sort"
                  items={["Lowest Price", "Highest Price"]}
                  onChange={handleChangeSort}
                />
              </Box>
              <Box sx={{ mt: 1 }}>
                <SelectSmall
                  label="Currency"
                  items={["USD", "AED"]}
                  onChange={(event) => setCurrency(event.target.value)}
                />
              </Box>
              <Box sx={{ mt: 1 }}>
                <CustomField
                  sx={{
                    width: "120px",
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
              </Box>

              {["Quote", "Check", "Place Order"].map((item, index) => (
                <Box sx={{ mt: 1 }} key={index}>
                  <CustomButton
                    title={item}
                    onClick={() => handleRequest(item)}
                  />
                </Box>
              ))}
            </Grid>
          </Box>
          <Box sx={{ height: "60vh", overflow: "auto" }}>
            {allProducts.map((product, index) => (
              <ProductCard
                currency={currency}
                product={{
                  ...product,
                  price: Math.round(product.price * currencyRate),
                }}
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
