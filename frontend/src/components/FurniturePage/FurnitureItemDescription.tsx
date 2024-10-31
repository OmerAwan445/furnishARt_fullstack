import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { FurnitureItemDetailsProps } from '@/types/Types';

const FurnitureItemDescription = ({ item }: { item: FurnitureItemDetailsProps }) => {
    const {
      name,
      description,
      stock_quantity,
      total_sales,
      color,
      dimension,
      weight,
    } = item;
  
    return (
      <Box component="div" sx={{ maxWidth: 800, }}>
        <Typography variant="h4" gutterBottom>Title</Typography>
        {name && (
          <Typography variant="body1" paragraph>
            {name}
          </Typography>
        )}
  
        <Divider sx={{ my: 2 }} />
  
        <Typography variant="h4" gutterBottom>Specification</Typography>
        <List>
          {stock_quantity !== undefined && (
            <ListItem>
              <ListItemText 
                primary="Stock Quantity" 
                secondary={stock_quantity} 
                sx={{ '& .MuiListItemText-secondary': { color: 'text.primary' } }} 
              />
            </ListItem>
          )}
          {total_sales !== undefined && (
            <ListItem>
              <ListItemText 
                primary="Total Sales" 
                secondary={total_sales} 
                sx={{ '& .MuiListItemText-secondary': { color: 'text.primary' } }} 
              />
            </ListItem>
          )}
          {color && (
            <ListItem>
              <ListItemText 
                primary="Color" 
                secondary={color} 
                sx={{ '& .MuiListItemText-secondary': { color: 'text.primary' } }} 
              />
            </ListItem>
          )}
          {dimension && (
            <ListItem>
              <ListItemText 
                primary="Dimension" 
                secondary={dimension} 
                sx={{ '& .MuiListItemText-secondary': { color: 'text.primary' } }} 
              />
            </ListItem>
          )}
          {weight !== undefined && (
            <ListItem>
              <ListItemText 
                primary="Weight" 
                secondary={`${weight} kg`} 
                sx={{ '& .MuiListItemText-secondary': { color: 'text.primary' } }} 
              />
            </ListItem>
          )}
        </List>
  
        <Divider sx={{ my: 2 }} />
  
        <Typography variant="h4" gutterBottom>Description</Typography>
        <List>
          {description && (
            <ListItem>
              <ListItemText primary={description} sx={{ '& .MuiListItemText-primary': { color: 'text.primary' } }} />
            </ListItem>
          )}
        </List>
      </Box>
    );
  };
  

export default FurnitureItemDescription;
