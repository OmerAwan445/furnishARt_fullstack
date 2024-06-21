import { FurnitureItemDetailsProps } from '@/types/Types';
import { Box, Grid, Stack, TextField, Typography } from '@mui/material';
import DefaultButton from '../common/buttons/DefaultButton';
import ProductImages from './FurnitureItemImages';

const FurnitureItemDetails = ({ item }: {item: FurnitureItemDetailsProps}) => {
  const { name, price, description, image_urls } = item;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <ProductImages images={image_urls} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>{name}</Typography>
          <Typography variant="h5" fontWeight={600} gutterBottom>${price}</Typography>
          <Typography variant="body1" paragraph>{description}</Typography>
          <Stack direction="row" spacing={2} alignItems="center" mt={3}>
            <TextField type="number" defaultValue={1} InputProps={{ inputProps: { min: 1 } }} sx={{ width: 100 }} />
            <DefaultButton>Add To Cart</DefaultButton>
          </Stack>
          <Typography variant="body2" color="textSecondary" mt={3}>GUARANTEED SAFE CHECKOUT</Typography>
          <img src="/path/to/payment-icons.png" alt="Payment Methods" />
          <Typography variant="body2" color="textSecondary">Your Payment is 100% Secure</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FurnitureItemDetails
