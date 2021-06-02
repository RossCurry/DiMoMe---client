import { PayloadAction } from '@reduxjs/toolkit';
// CATEGORY
export const addCategory = (newCategory: string): PayloadAction<string> => ({
  type: 'ADD_CATEGORY',
  payload: newCategory,
});
export const editCategory = (newCategory: string): PayloadAction<string> => ({
  type: 'EDIT_CATEGORY',
  payload: newCategory,
});
export const deleteCategory = (categoryId: number): PayloadAction<number> => ({
  type: 'DELETE_CATEGORY',
  payload: categoryId,
});

// USER
export const updateUser = (user: string): PayloadAction<string> => ({
  type: 'UPDATE_USER',
  payload: user,
});
