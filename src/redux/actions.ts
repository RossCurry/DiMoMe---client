import { PayloadAction } from '@reduxjs/toolkit';
import { userFromDB } from '../ApiService';

type categoryAction = {
  type: 'ADD_CATEGORY' | 'EDIT_CATEGORY' | 'DELETE_CATEGORY';
  payload: string | number;
};

// CATEGORY
export const addCategory = (newCategory: string): categoryAction => ({
  type: 'ADD_CATEGORY',
  payload: newCategory,
});
export const editCategory = (newCategory: string): categoryAction => ({
  type: 'EDIT_CATEGORY',
  payload: newCategory,
});
export const deleteCategory = (categoryId: number): categoryAction => ({
  type: 'DELETE_CATEGORY',
  payload: categoryId,
});

// TODO add user action type
// USER
export const updateUser = (user: userFromDB): PayloadAction<userFromDB> => ({
  type: 'UPDATE_USER',
  payload: user,
});
