'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { FiltersActions } from '@/store/Slices/FiltersSlice';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = [7, 10, 20, 40];

export default function ItemsPerPageSelect() {
    const { itemsPerPage } = useAppSelector(state => state.filters);
    const dispatch = useAppDispatch();
    const { changeItemsPerPage } = FiltersActions;
  
    const handleChange = (event: SelectChangeEvent<number>) => { 
        // Dispatch action to change items per page =================
        dispatch(changeItemsPerPage(Number(event.target.value ?? '7')));
    };



  return (
    <div>
      <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
        <Select
          value={itemsPerPage}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Items per page' }}
        >
          {/* <MenuItem disabled selected value={'0'}>
            <em>Items Per Page</em>
          </MenuItem> */}
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
            >
              {option}<em className='ml-1'>Items per page</em>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
