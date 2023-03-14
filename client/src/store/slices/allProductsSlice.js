import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//GET ALL PRODUCTS
export const fetchAllProducts = createAsyncThunk('/products/fetchAllProducts', async () => {
  
    const response = await fetch("/products")
     
    const data = await response.json()
   
    return data;
})




const initialState = {
    idLoading: false,
    allProducts: [],
    error: "Error"
}


const allproductsSlice = createSlice({
    name: "allProducts",
    initialState,
    reducers: {
        getSingleProduct: (state, action) => {
            const idx = state.allProducts.findIndex(item => item.id === action.payload.id)
            console.log(idx)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.allProducts = action.payload
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.error = action.error.message;
            })
            

    }
})


export const { getSingleProduct } = allproductsSlice.actions
export default allproductsSlice.reducer;

