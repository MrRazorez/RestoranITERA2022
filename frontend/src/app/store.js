import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/keranjang/cartSlice';

export default configureStore({
  reducer: {
    cart : cartReducer
  },
})