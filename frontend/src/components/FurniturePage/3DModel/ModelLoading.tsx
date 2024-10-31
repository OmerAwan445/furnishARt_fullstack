import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ModelLoading = () => {
  return (
    <Box component="div"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      bgcolor="#f0f0f0"
    >
      <CircularProgress color="primary" size={60} />
      <Typography variant="h6" color="textSecondary" mt={2}>
        Loading Model...
      </Typography>
    </Box>
  );
};

export default ModelLoading;
