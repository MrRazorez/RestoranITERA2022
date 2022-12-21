import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    value: (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).value : [],
  },
  reducers: {
    addCart: (state, action) => {
      var value = [];
      if (localStorage.getItem('cart')) {
        value = JSON.parse(localStorage.getItem('cart')).value;
      }
      for (let i in value) {
        if (value[i].uid === action.payload) {
          value[i].total += 1;
          state.value = value;
          localStorage.setItem('cart', JSON.stringify(state));
          return
        }
      }
      state.value.push({
          uid: action.payload,
          total: 1
      });
      localStorage.setItem('cart', JSON.stringify(state));
    },
    incrementCart: (state, action) => {
      var value = JSON.parse(localStorage.getItem('cart')).value;

      for (let i in value) {
        if (value[i].uid === action.payload) {
          value[i].total += 1;
          state.value = value;
          localStorage.setItem('cart', JSON.stringify(state));
          return
        }
      }
    },
    decrementCart: (state, action) => {
      var value = JSON.parse(localStorage.getItem('cart')).value;

      for (let i in value) {
        if (value[i].uid === action.payload) {
          if (value[i].total > 1) {
            value[i].total -= 1;
          }
          state.value = value;
          localStorage.setItem('cart', JSON.stringify(state));
          return
        }
      }
    }
  }
})

export const { addCart, incrementCart, decrementCart } = cartSlice.actions;

export default cartSlice.reducer;