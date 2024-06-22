import { configureStore } from '@reduxjs/toolkit';
import navSlice from './slices/navSlice';

const store = configureStore({
  reducer: {
    navSlice:navSlice
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;