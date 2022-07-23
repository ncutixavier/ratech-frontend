import { Grid, Box, Paper } from "@mui/material";
import React from "react";
import CustomButton from "../components/CustomButton";
import { Title } from "../layouts/RetailDashboard";
import { decodeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import StatusBox from "../components/StatusBox";

const RetailDashboard = () => {
  const navigate = useNavigate();
  const user = decodeToken();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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

  const checks = {
    created_at: "July 14, 2022, 9:36 p.m.",
    updated_at: "2020-01-01 00:00:00",
    user_id: 1,
    products: [
      {
        condition: "Refurbished",
        name: "Apple MacBook Pro",
        specifications:
          "13-inch MacBook Pro with Retina display, Touch Bar, Touch ID, and Touch ID fingerprint sensor. Intel Core i7 and 16GB RAM.",
        price: 919.0,
        id: "PLT-00012",
        status: "Available",
      },
      {
        condition: "Brand New",
        name: "Apple MacBook Air",
        specifications:
          "13-inch MacBook Air with Retina display, Touch Bar, Touch ID, and Touch ID fingerprint sensor. Intel Core i7 and 16GB RAM.",
        price: 799.76,
        id: "PLT-00013",
        status: "Processing",
      },
    ],
  };

  const getStatusColor = (status) => { 
    switch (status) {
      case "Available":
        return "#229954";
      case "Processing":
        return "#3498DB";
      case "Out of stock":
        return "#AB0000";
      default:
        return "#34495E";
    }
  }

  const handleCheck = (selected, product) => { 
    if (selected.target.checked) {
      console.log("selected::", selected.target.checked);
      console.log("product::", product);
    }
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
            <div>
              {products.map((product, i) => (
                <Accordion
                  expanded={expanded === `panel${i}`}
                  onChange={handleChange(`panel${i}`)}
                  sx={{ mb: 2 }}
                  key={i}
                  variant="outlined"
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography
                      sx={{
                        width: "50%",
                        flexShrink: 0,
                        mr: 2,
                        fontWeight: 500,
                      }}
                    >
                      Request on{" "}
                      <span style={{ color: "text.secondary" }}>
                        {checks.created_at}
                      </span>
                    </Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {checks.products.length} items
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {checks.products.map((product, i) => (
                      <Paper
                        key={i}
                        variant="outlined"
                        sx={{
                          position: "relative",
                          mb: 2,
                          p: 1,
                          border: `1px solid ${getStatusColor(product.status)}`,
                        }}
                      >
                        <FormControlLabel
                          sx={{mb: 1}}
                          control={
                            <Checkbox
                              icon={
                                <CheckBoxOutlineBlankIcon color="primary" />
                              }
                              checkedIcon={<CheckBoxIcon color="primary" />}
                              onChange={(selected) =>
                                handleCheck(selected, product)
                              }
                            />
                          }
                          label={`${product.condition} ${product.name} - ${product.specifications} - $ ${product.price}`}
                        />
                        <StatusBox status={product.status} />
                      </Paper>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
            {/* {products.map((product, i) => (
              <ProductCard
                key={i}
                product={{
                  ...product,
                  condition: "Brand New",
                  location: "Dubai",
                  status: "In checking",
                }}
              />
            ))} */}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RetailDashboard;
