import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import categoryReducer from './reducers/categorySlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    category: categoryReducer,
    // item: itemReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
