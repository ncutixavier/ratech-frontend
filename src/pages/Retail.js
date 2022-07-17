import { Grid, Box, InputAdornment } from "@mui/material";
import React from "react";
import products from "../assets/data.json";
import ProductCard from "../components/ProductCard";
import CustomTextField, { CustomField } from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Title } from "../layouts/RetailDashboard";
import { useNavigate } from "react-router-dom";
import SelectSmall from "../components/SelectSmall";
import QuoteModal from "../components/QuoteModal";
import { decodeToken } from "../utils/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchProduct,
  searchProduct,
} from "../features/products/SearchProductSlice";

const RetailDashboard = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [currency, setCurrency] = React.useState("USD");
  const [currencyRate, setCurrencyRate] = React.useState(1);
  const [allProducts, setAllProducts] = React.useState([...products]);
  const [loadingRate, setLoadingRate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const user = decodeToken();
  const dispatch = useDispatch();
  const { products, loading } = useSelector(selectSearchProduct);

  React.useEffect(() => {
    if (!user) {
      localStorage.clear();
      navigate(`/auth?redirect=${window.location.pathname}`);
    }
  }, [navigate, user]);

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
    if (request.toLowerCase() === "check" && selectedItems.length > 0) {
      localStorage.setItem("products", JSON.stringify(selectedItems));
      navigate("checklist");
    } else if (request.toLowerCase() === "quote") {
      setOpen(true);
    }
  };

  const handleChangeSort = (e) => {
    if (/lowest/.test(e.target.value.toLowerCase())) {
      setAllProducts([...products].sort((a, b) => a.price - b.price));
    } else if (/highest/.test(e.target.value.toLowerCase())) {
      setAllProducts([...products].sort((a, b) => b.price - a.price));
    }
  };

  const handleChangeMargin = (e) => {
    const margin = parseInt(e.target.value || 0);
    console.log(margin);
    if (margin > 0) {
      setAllProducts(
        [...products].map((product) => {
          return {
            ...product,
            price: product.price + (product.price * parseInt(margin)) / 100,
          };
        })
      );
    } else {
      setAllProducts(
        [...products].map((product) => {
          return {
            ...product,
          };
        })
      );
    }
  };

  React.useEffect(() => {
    setLoadingRate(true);
    fetch("https://cdn.moneyconvert.net/api/latest.json")
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[currency];
        setCurrencyRate(rate);
        setLoadingRate(false);
      });
  }, [currency]);

  const handleSearchProduct = (e) => {
    // dispatch(searchProduct(e.target.value));
    console.log(e.target.value);
  };

  return (
    <Box>
      <QuoteModal open={open} close={() => setOpen(false)} />
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7}>
          <Box sx={{ mb: 1, mt: 2 }}>
            <Title variant="h4">Rateck Live Stock</Title>
            <CustomTextField onChange={handleSearchProduct} />
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
                  type="number"
                  onChange={handleChangeMargin}
                  sx={{
                    width: "120px",
                  }}
                  label="Margin"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                    style: {
                      height: "35px",
                      padding: "0 14px",
                    },
                  }}
                  /* styles the label component */
                  InputLabelProps={{
                    style: {
                      height: "35px",
                    },
                  }}
                  fullWidth
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
                loading={loadingRate}
                currency={currency}
                product={{
                  ...product,
                  price: Math.round(product.price * currencyRate),
                  condition: "Brand New",
                  location: "Dubai",
                  status: "",
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
