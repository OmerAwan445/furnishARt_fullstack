"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SimpleTabsProps } from "@/types/Types";
import theme from "@/utils/theme";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box component="div" sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const SimpleTabs: React.FC<SimpleTabsProps> = ({ tabs }) => {
    const [value, setValue] = useState(0);
  
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <Box component="div" sx={{ width: '100%' }}>
        <Box component="div" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {tabs.map((tab, index) => (
              <Tab className={ value === index ? "!text-primary-main" : "!text-lightBrown"} key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {tabs.map((tab, index) => (
          <CustomTabPanel key={index} value={value} index={index}>
            {tab.component}
          </CustomTabPanel>
        ))}
      </Box>
    );
  };

export default SimpleTabs;
