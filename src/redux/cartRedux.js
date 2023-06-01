import { createSlice } from '@reduxjs/toolkit';


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.quantity += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload._id
      );
      state.quantity -= action.payload.quantity;
      state.total -= action.payload.price * action.payload.quantity;

    },
    updateProduct: (state, action) => {
      state.products = state.products.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      state.quantity = state.products.reduce((total, item) => total + item.quantity, 0);
      state.total = state.products.reduce((total, item) => total + item.total, 0);  
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, updateProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;