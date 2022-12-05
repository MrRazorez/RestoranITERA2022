import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).value : [],
  },
  reducers: {
    addCart: (state, action) => {
        console.log(action.payload);
        state.value.push({
            uid: action.payload,
            total: 1
        });
        localStorage.setItem('cart', JSON.stringify(state));
    }
  },
})

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;