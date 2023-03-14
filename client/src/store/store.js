import {configureStore} from "@reduxjs/toolkit";
import categoriesSlice  from "./slices/categorySlice";
import shoppingCartSlice from "./slices/shoppingCartSlice"
import userSlice from "./slices/userSlice";
import productsSlice from "./slices/productsSlice";
import allProductsSlice from "./slices/allProductsSlice";
import orderSlice from "./slices/orderSlice";
import favoriteSlice from "./slices/favoriteSlice"

const store = configureStore({
    reducer: {
        user: userSlice,
        categories: categoriesSlice,
        shoppingCart: shoppingCartSlice,
        products: productsSlice,
        allProducts: allProductsSlice,
        orders: orderSlice,
        favorites: favoriteSlice
    }
})

export default store;
