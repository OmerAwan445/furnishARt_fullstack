import { FurnitureItemDetailsProps } from '@/types/Types';
import { Box, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import DefaultButton from '../common/buttons/DefaultButton';
import ProductImages from './FurnitureItemImages';
import Scene3DModel from './3DModel/Scene3DModel';

const FurnitureItemDetails = ({ item }: { item: FurnitureItemDetailsProps }) => {
  const { name, price, description, image_urls, total_sales, weight, color, dimension } = item;

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <ProductImages images={image_urls} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
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
            <TextField type="number" defaultValue={1} InputProps={{ inputProps: { min: 1 } }} sx={{ width: 100, }} />
            <DefaultButton>Add To Cart</DefaultButton>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FurnitureItemDetails
