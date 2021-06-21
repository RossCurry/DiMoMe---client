import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { categoryFromDB } from '../../types/customTypes';

// initial state type
const initialState: categoryFromDB[] = [];

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    loadCategories(state, action: PayloadAction<categoryFromDB[]>) {
      state.push(...action.payload);
    },
    addNewCategoryToStore(state, action: PayloadAction<categoryFromDB>) {
      // waiting on API
      state.push(action.payload);
    },
    removeCategory(state, action) {
      // waiting on API
    },
  },
});

export const { loadCategories, addNewCategoryToStore, removeCategory } =
  categorySlice.actions;

export const { reducer } = categorySlice;

export default reducer;
