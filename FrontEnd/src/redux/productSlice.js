import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [], // Array to store product list
        viewProducts: false,
        addEditProducts: false,
        productId: null, // Stores the product ID when editing
    },
    reducers: {
        setAddEditProducts: (state, action) => {
            const { productId = null } = action.payload || {};
            state.addEditProducts = true;
            state.productId = productId;
        },
        setViewProducts: (state, action) => {
            state.viewProducts = action.payload;
            state.addEditProducts = false; // Ensure addEditProducts is off
            state.productId = null; // Reset productId when viewing
        },
        resetAddEditProducts: (state) => {
            state.addEditProducts = false;
            state.productId = null;
        },
        deleteProductFromState: (state, action) => {
            const productId = action.payload;
            state.products = state.products.filter(product => product._id !== productId);
        },

    }
});

export const { setAddEditProducts, setViewProducts, resetAddEditProducts,deleteProductFromState } = productSlice.actions;
export default productSlice.reducer;
