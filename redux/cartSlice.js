import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listCart: [],  // Sepete eklenen ürünler
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.listCart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.adet += 1; // Eğer ürün zaten sepette varsa, adetini arttır
            } else {
                state.listCart.push({ ...action.payload, adet: 1 }); // Yeni ürünse sepete ekle
            }
        },
        removeFromCart: (state, action) => {
            state.listCart = state.listCart.filter(item => item.id !== action.payload.id);
        },
        increaseQuantity: (state, action) => {
            const item = state.listCart.find(item => item.id === action.payload.id);
            if (item) {
                item.adet += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.listCart.find(item => item.id === action.payload.id);
            if (item && item.adet > 1) {
                item.adet -= 1;
            }
        }
    }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
