import { Review } from '@/types/Types';
import { stringAvatar } from '@/utils/others/avatarColor';
import { Avatar, Box, Divider, Grid, Rating, Stack, Typography } from '@mui/material';
import { IoIosStarOutline } from 'react-icons/io';

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <Box component="div" >
      {reviews.map((review, index) => {
        const customerFullName = review.customer.first_name + " " + review.customer.last_name;
        return (
        <>
          <Box component="div" key={index} sx={{ mb: 2.5 }}>
              <Stack direction="row" spacing={2}>
                  <Avatar
                    {...stringAvatar(customerFullName)}
                    alt={customerFullName}
                    sx={{ width: 45, height: 45 }}
                  />
                <Stack direction="column">
                <Rating
                  className='!text-base mb-1'
                    name="text-feedback"
                    value={review.rating ?? 0}
                    readOnly
                    precision={0.5}
                    emptyIcon={<IoIosStarOutline fontSize="inherit" />}
                  />
                  <Typography variant="body2" m={0} color="GrayText" gutterBottom>
                    {review.comment}
                  </Typography>
                  <Typography variant="h6" m={0} color="textPrimary">
                    {customerFullName}
                  </Typography>
                  <Typography variant="subtitle2" color="burlywood">
                    {review.customer.username}
                  </Typography>
                </Stack>
              </Stack>
          </Box>
          {index+1 !== reviews.length && <Divider sx={{ mb: 2 }} />}
          </>
        );
      })}
    </Box>
  );
};

export default Reviews;
