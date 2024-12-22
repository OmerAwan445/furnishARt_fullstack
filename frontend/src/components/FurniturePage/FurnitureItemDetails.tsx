'use client';

import { FurnitureItemDetailsProps } from '@/types/Types';
import { Box, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import AddToCartButton from '../common/buttons/AddToCartButton';
import FurnitureImagesAnd3DModel from './FurnitureImagesAnd3DModel';
import { useState } from 'react';
import GradientButton from '../common/buttons/GradientButton';
import Link from 'next/link';
import DeepLinkButton from '../common/DeepLinkButton';

const FurnitureItemDetails = ({ item }: { item: FurnitureItemDetailsProps }) => {
  const { id, name, price, description, image_urls, total_sales, weight, color, dimension, model_3d_url } = item;
  const [quantity, setQuantity] = useState(1);
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <FurnitureImagesAnd3DModel modelUrl={model_3d_url} images={image_urls} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box component="div">
          <Typography variant="h4" fontWeight={600} gutterBottom>{name}</Typography>
          <Typography variant="h5" fontWeight={600} gutterBottom>${price}</Typography>
          <Typography variant="body1" paragraph>{description}</Typography>

          <Divider sx={{ my: 2 }} />

          {/* <Stack direction="column" spacing={1.5} mt={3}>
          <Typography variant="body1" fontWeight={500}>Total Sales: {total_sales}</Typography>
          <Typography variant="body1" fontWeight={500}>Weight: {weight} kg</Typography>
          <Typography variant="body1" fontWeight={500}>Color: {color}</Typography>
          <Typography variant="body1" fontWeight={500}>Dimensions: {dimension}</Typography>
          </Stack> */}

          <Stack direction="row" spacing={2} alignItems="center" mt={3}>
            <TextField type="number" defaultValue={quantity} onChange={(e)=>setQuantity(Number(e.target.value))} InputProps={{ inputProps: { min: 1 } }} sx={{ width: 100, }} />
            <AddToCartButton quantity={quantity} furnitureId={id}/>
            <DeepLinkButton id={id}/>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FurnitureItemDetails
