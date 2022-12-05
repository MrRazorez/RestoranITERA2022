import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: [],
  },
  reducers: {
    addCart: (state, action) => {
        console.log(action.payload);
        state.value.push(action.payload);
    }
  },
})

export const { addCart } = cartSlice.actions;

export default cartSlice.reducer;