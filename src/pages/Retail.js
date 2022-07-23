import { Grid, Box, InputAdornment, Button } from "@mui/material";
import React from "react";
import ProductCard from "../components/ProductCard";
import { CustomField } from "../components/CustomTextField";
import CustomButton from "../components/CustomButton";
import { Title } from "../layouts/RetailDashboard";
import { useNavigate } from "react-router-dom";
import SelectSmall from "../components/SelectSmall";
import QuoteModal from "../components/QuoteModal";
import { decodeToken } from "../utils/auth";
import { useDispatch, useSelector, useStore } from "react-redux";
import {
  selectSearchProduct,
  searchProduct,
} from "../features/products/SearchProductSlice";
import SearchSkeleton from "../skeletons/SearchSkeleton";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "../validations";

const RetailDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [currency, setCurrency] = React.useState("USD");
  const [currencyRate, setCurrencyRate] = React.useState(1);
  const [allProducts, setAllProducts] = React.useState([...products]);
  const [loadingRate, setLoadingRate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [quote, setQuote] = React.useState("");
  const user = decodeToken();
  const dispatch = useDispatch();
  const store = useStore();
  const { loading } = useSelector(selectSearchProduct);

  React.useEffect(() => {
    if (!user) {
      localStorage.clear();
      navigate(`/auth?redirect=${window.location.pathname}`);
    }
    let searchResults = store.getState().searchProduct.results;
    setAllProducts(
      Array.isArray(searchResults) ? [] : searchResults?.data?.data
    );
    setProducts(Array.isArray(searchResults) ? [] : searchResults?.data?.data);
  }, [navigate, store, user]);

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

  const handleRequest = async (request) => {
    if (request.toLowerCase() === "check" && selectedItems.length > 0) {
      const user = localStorage.getItem("user");
      const data = {
        user: user,
        products: selectedItems.map((item) => item.uuid),
        type: "check",
        status: "processing",
      };
      localStorage.setItem("products", JSON.stringify(selectedItems));
      console.log("data::", data);
      // const res = await dispatch(checklist(data)).unwrap();
      // console.log("res::", res);
      navigate("checklist");
    } else if (request.toLowerCase() === "quote" && selectedItems.length > 0) {
      let sharedQuote = "";
      selectedItems.forEach((product) => {
        const text = `${product.condition} ${product.name} - ${product.specifications} - ${currency} ${product.price} `;
        sharedQuote +=
          text +
          "                                                                                ";
      });
      setQuote(sharedQuote);
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
    if (margin > 0) {
      setAllProducts(
        [...products].map((product) => {
          return {
            ...product,
            price:
              parseFloat(product.price) +
              (parseFloat(product.price) * margin) / 100,
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

  const onSearchProduct = (item) => {
    dispatch(searchProduct(item)).then((response) => {
      setAllProducts(response.payload?.data?.data);
      setProducts(response.payload?.data?.data);
    });
  };

  const handleSearchProduct = (e) => {
    if (e.charCode === 13) {
      onSearchProduct(e.target.value);
    }
  };

  const onSearch = (data) => {
    onSearchProduct(data.search);
  };

  const { register, handleSubmit, control } = useForm({
    resolver: yupResolver(searchSchema),
  });

  return (
    <Box>
      <QuoteModal open={open} close={() => setOpen(false)} text={quote} />
      <Grid container justifyContent="center">
        <Grid item xs={11} md={7}>
          <Box sx={{ mb: 1, mt: 2 }}>
            <Title variant="h4">Rateck Live Stock</Title>
            <Box sx={{ display: "flex" }}>
              <CustomField
                control={control}
                {...register("search")}
                onKeyPress={handleSearchProduct}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  style: {
                    height: "40px",
                    padding: "0 12px",
                  },
                }}
                /* styles the label component */
                InputLabelProps={{
                  style: {
                    height: "40px",
                  },
                }}
                fullWidth
                placeholder="Search any product"
                variant="outlined"
                color="success"
              />
              <Button
                variant="contained"
                disableElevation
                sx={{ ml: 1, borderRadius: "8px" }}
                onClick={handleSubmit(onSearch)}
              >
                Search
              </Button>
            </Box>
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
          {loading ? (
            <SearchSkeleton />
          ) : (
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
                  onChange={(selected) =>
                    handleSelectProducts(selected, product)
                  }
                  key={index}
                />
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default RetailDashboard;
