'use client';

import React, { useState, useEffect } from 'react';
import { Pagination, Stack, Box, Grid, Typography } from '@mui/material';
import { ItemCardProps } from '@/types/Types';
import ItemCard from '../common/ItemCards/ItemCard';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { FiltersActions } from '@/store/Slices/FiltersSlice';
import FurnitureItemsSvs from '@/services/FurnitureItems';

// const compareArrays = (a: ItemCardProps[], b: ItemCardProps[]) =>
//   a.length === b.length &&
//   a.every((element, index) => element.id === b[index].id);

const ItemsPagination: React.FC<{items: ItemCardProps[] | null}> = ({ items }) => {
  const [paginatedItems, setPaginatedItems] = useState<ItemCardProps[]| null>(items);
  const { itemsPerPage, page, category_ids } = useAppSelector(state => state.filters);
  
  const dispatch = useAppDispatch();
  const { changePage } = FiltersActions;

    useEffect(() => {
    (async () => {
        const paginatedItems = await FurnitureItemsSvs.getFurnitureItems({ category_ids, page, itemsPerPage });
            setPaginatedItems(paginatedItems);
    })();  
    // setPaginatedItems(items);
  }, [page, itemsPerPage, category_ids]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(changePage(page));
  };

  return (
    <Stack>
        <Grid container spacing={{ xs: 5, sm: 2, md: 2, lg: 3 }}>
    {paginatedItems ? paginatedItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item.id}>
          <ItemCard contentHeight= {170} item={item} />
        </Grid>
      ))
      : 
      <Typography variant='h3'>No Items Found</Typography> 
    }
    </Grid>
    <Stack alignSelf={"flex-end"} spacing={2} alignItems="center" mt={4}>
      <Pagination
        count={100}
        page={page}
        onChange={handlePageChange}
        color="primary"
      />
    </Stack>
  </Stack>
  );
};

export default ItemsPagination;
