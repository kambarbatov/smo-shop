import { createSlice } from '@reduxjs/toolkit';
import data from "../data"

const initialState = {
    listCart: data,
    selectedCard: [],
};

const quantitySlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addQuantity: (state, action) => {
            state.listCart = state.listCart.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, adet: item.adet + 1 };
                }
                return item;
            });
            state.selectedCard = state.listCart.filter(item => item.selected);
        },
        reduceQuantity: (state, action) => {
            state.listCart = state.listCart.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, adet: Math.max(item.adet - 1, 0) };
                }
                return item;
            });
            state.selectedCard = state.listCart.filter(item => item.selected);
        }
    }
});

export const { addQuantity, reduceQuantity } = quantitySlice.actions;
export default quantitySlice.reducer;
