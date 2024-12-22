import React from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const DeepLinkButton = ({ id }: { id: number }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the device is mobile

  const handleDeepLink = () => {
    const deepLinkURL = `furnishart://open?contentId=${id}`;
    window.location.href = deepLinkURL;
  };

  if (!isMobile) {
    return null;
  }

  return (
    <Button
      variant="contained" 
      color="success"
      onClick={handleDeepLink}
    >
      View Ar Preview
    </Button>
  );
};

export default DeepLinkButton;
