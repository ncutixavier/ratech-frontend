import * as React from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CheckList from "../components/CheckList";
import OrderDashboard from "../components/Order";
import { useSearchParams } from "react-router-dom";

export default function OrderDetails() {
  let [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(
    searchParams.get("type") ? "2" : "1"
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "#fff",
            position: "sticky",
            top: { xs: "55px", sm: "65px" },
            zIndex: "1",
          }}
        >
          <TabList
            onChange={handleChange}
            aria-label="Order Details"
            variant="fullWidth"
          >
            <Tab label="CheckList" value="1" />
            <Tab label="Order" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" sx={{ px: { xs: "0" } }}>
          <CheckList />
        </TabPanel>
        <TabPanel value="2">
          <OrderDashboard />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
