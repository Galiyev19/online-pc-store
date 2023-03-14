import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//
export const fetchCategories = createAsyncThunk('/categories/fetchCategories', async () => {
   
    const response = await fetch("/categories")
    const data = await response.json()
   
    return data;

})

const initialState = {
    idLoading: false,
    categories: [],
    error: "Error"
}

 const categoriesSlice = createSlice ({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state,action) => {
            state.isLoading = true
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        })
        .addCase(fetchCategories.rejected, (state,action) => {
            state.error = action.error.message;
        })

    }

})


export default categoriesSlice.reducer