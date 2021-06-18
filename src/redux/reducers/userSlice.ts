/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userFromDB } from '../../ApiService';

export interface userState {
  _id: number;
  email: string;
  name: string;
  localType: string;
  localName: string;
}

const initialState = {
  _id: 0,
  email: '',
  name: '',
  localType: '',
  localName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<userFromDB>) {
      state._id = action.payload._id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.localType = action.payload.localType;
      state.localName = action.payload.localName;
    },
    // deleteUser(state, action) {
    //   return state;
    // },
  },
});

export const { updateUser } = userSlice.actions;

// Extract the action creators object and the reducer
const { reducer } = userSlice;
// Export the reducer, either as a default or named export
export default reducer;
