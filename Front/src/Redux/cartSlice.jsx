import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    listCart: [],
    isCartOpen: false,
    cartUpdate: false,
  },
  reducers: {
    addToCart: (state, action) => {
     return{
      ...state,
      listCart: [...state.listCart, action.payload],
     }
    },
    removeFromCart: (state, action) => {
      // Filtra los elementos que no coincidan con el ID del juego a eliminar
      state.listCart = state.listCart.filter((item) => item.id !== action.payload);
    },

    toggleCart: (state) => {
      return{
        ...state,
        isCartOpen: !state.isCartOpen,
      }
    },
    cartUpdate: (state) => {
      state.cartUpdate = !state.cartUpdate;
    },
  },
});

export const { addToCart, toggleCart, removeFromCart, cartUpdate } = cartSlice.actions;
export default cartSlice.reducer;