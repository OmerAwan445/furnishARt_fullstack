"use client";

import TitleHeadings from '@/components/common/headings/TitleHeadings';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import CategorySvs from '@/services/Category';
import { CategoryActions } from '@/store/Slices/CategorySlice';
import { SnackBarActions } from '@/store/Slices/SnackBarSlice';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

function CategoriesPage() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((store) => store.categories);
  const { AddCategories } = CategoryActions;
  const { addMessage } = SnackBarActions;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<{ id: number; name: string } | null>(null);

  useEffect(() => {
    (async () => {
      const data = await CategorySvs.getCategories();
      if (!data) return;
      dispatch(
        AddCategories([
            { value: 0, label: 'All categories' },
          ...data.map((cat) => ({ value: cat.id, label: cat.name })),
        ])
      );
    })();
  }, [dispatch]);

  const handleEditClick = (category: { id: number; label: string }) => {
    setCurrentCategory({ id: category.id, name: category.label });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = async (categoryId: number) => {
      const { error, message } = await CategorySvs.deleteCategory(categoryId);
      dispatch(addMessage({ message, type: error ? 'error' : 'success' }));
    if (!error) {
      dispatch(AddCategories(categories.filter((cat) => cat.value !== categoryId)));
    }
  };

  const handleEditSave = async () => {
    if (currentCategory) {
      const { error, message } = await CategorySvs.editCategory(currentCategory.id, currentCategory.name);
      console.log(message, "message");
      dispatch(addMessage({ message, type: error ? 'error' : 'success' }));
      if (!error) {
        const updatedCategories = categories.map((cat) =>
          cat.value === currentCategory.id ? { ...cat, label: currentCategory.name } : cat
        );
        dispatch(AddCategories(updatedCategories));
        setEditDialogOpen(false);
      }
    }
  };

  return (
    <Container>
      <Box my={4}>
        <TitleHeadings>Categories</TitleHeadings>
        <Typography variant="subtitle1" gutterBottom textAlign="center">
          Manage your categories below:
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.slice(1).map((option) => (
            <Grid key={option.value} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  textAlign: 'center',
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s',
                  },
                }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ fontWeight: 'bold', color: '#3f51b5' }}
                    >
                      {option.label}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick({ id: option.value, label: option.label })}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteClick(option.value)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            value={currentCategory?.name || ''}
            onChange={(e) =>
              setCurrentCategory((prev) => prev && { ...prev, name: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CategoriesPage;
