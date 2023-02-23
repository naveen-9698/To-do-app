import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import React, { useState } from "react";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";

const IndexContainer = () => {
  const [value, setValue] = useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const paperStyle = {
    width: 460,
    margin: "20px auto",
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Sign Up" />
        <Tab label="Sign In" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Signup />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Signin />
      </TabPanel>
    </Paper>
  );
};

export default IndexContainer;
