import { Grid, Box, Paper } from "@mui/material";
import React from "react";
import { Title } from "../layouts/RetailDashboard";
import { decodeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  selectGetOrder,
} from "../features/products/getOrderSlice";
import ChecklistSkeleton from "../skeletons/ChecklistSkeleton";

const ChecklistDashboard = () => {
  const navigate = useNavigate();
  const user = decodeToken();
  const dispatch = useDispatch();
  const { loading, results } = useSelector(selectGetOrder);
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

  React.useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "available":
        return "#229954";
      case "processing" :
        return "#3498DB";
      case "out of stock":
        return "#AB0000";
      default:
        return "#34495E";
    }
  };

  const allResults = results?.data?.data;

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
                borderRadius: "5px",
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
                <Title
                  variant="h6"
                  sx={{ margin: "10px 0", fontWeight: "bold" }}
                >
                  My order
                </Title>
                {/* <CustomButton title={"Place Order"} /> */}
              </Box>
            </Paper>
          </Box>

          <Box sx={{ height: "70vh", overflow: "auto" }}>
            {loading || allResults === undefined ? (
              <ChecklistSkeleton />
            ) : (
              <div>
                {Object.keys(allResults).map((key) => (
                  <Accordion
                    expanded={expanded === `panel${key}`}
                    onChange={handleChange(`panel${key}`)}
                    sx={{ mb: 2 }}
                    key={key}
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
                          {allResults[key]["created_at"]} UTC
                        </span>
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {allResults[key]["products"].length} items
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {allResults[key]["products"].map((product, i) => (
                        <Paper
                          key={i}
                          variant="outlined"
                          sx={{
                            position: "relative",
                            mb: 2,
                            p: 1,
                            border: `1px solid ${getStatusColor(
                              product.order_status
                            )}`,
                          }}
                        >
                          <Typography>{`${product.condition} ${product.name} - ${product.specifications} - $ ${product.price}`}</Typography>
                          {/* <StatusBox status={"Waiting for order"} /> */}
                        </Paper>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChecklistDashboard;
