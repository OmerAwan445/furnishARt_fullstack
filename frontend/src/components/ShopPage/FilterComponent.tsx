"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { FiltersActions } from "@/store/Slices/FiltersSlice";
import theme from "@/utils/theme";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { FaFilter } from "react-icons/fa";
import ItemsPerPageSelect from "./ItemsPerPageSelect";

const FilterComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const categories = useAppSelector((store) => store.categories);
  const { category_ids } = useAppSelector((store) => store.filters);
  const dispatch = useAppDispatch();
  const { addCategoryToFilter, removeCategoryFromFilter } = FiltersActions;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlerOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    const option = JSON.parse(event.target.getAttribute("value") ?? "0");
    if (checked) {
      dispatch(addCategoryToFilter({ category_id: option }));
    } else {
      dispatch(removeCategoryFromFilter({ category_id: option }));
    }
  };

  const filterItems = [
    // {
    //   title: 'Price',
    //   options: ['$0 - $25', '$25 - $50', '$50 - $75', '$75+']
    // },
    // {
    //   title: 'Color',
    //   options: ['White', 'Beige', 'Blue', 'Brown', 'Green', 'Purple']
    // },
    {
      title: "Category",
      options: categories,
    },
  ];

  return (
    <Stack alignItems={"center"} direction={"row"} justifyContent="space-between" mb={5}>
      <Stack alignItems={"center"} direction={"row"} spacing={1}>
      <IconButton onClick={handleClick}>
        <FaFilter />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: 500,
              width: "auto",
              padding: theme.spacing(2),
            },
          },
        }}
      >
        <Grid
          container
          className="gap-10 md:gap-24"
          direction={isSmallScreen ? "column" : "row"}
        >
          {filterItems.map((filter, index) => (
            <Grid item key={index}>
              <Typography variant="h6">{filter.title}</Typography>
              {filter.options.map((option, idx) => {
                if (idx === 0) return; // don't show all category option
                return (
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ width: "100%" }}
                    key={idx}
                  >
                    <FormControlLabel
                      className="items-center"
                      control={
                        <Checkbox
                          inputProps={{
                            value: JSON.stringify(option.value),
                          }}
                          data-option={JSON.stringify(option.value)}
                          onChange={handlerOnChange}
                          checked={category_ids?.includes(option.value)}
                        />
                      }
                      label={option.label}
                      sx={{ flexGrow: 1 }}
                    />
                  </Stack>
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Menu>
      <Typography variant="h5" className="text-darkplum">Filters</Typography>
      </Stack>
      <ItemsPerPageSelect />
    </Stack>
  );
};

export default FilterComponent;
