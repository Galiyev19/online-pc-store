import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDocs } from 'firebase/firestore'
import { db } from "../../firebase"

export const fetchProducts = createAsyncThunk('/products/fetchProducts', async (name) => {
  
    const colRef = collection(db, name)

    const docSnap = await getDocs(colRef);

    const data = docSnap.docs.map(item => item.data())

    return data
   

})


const initialState = {
    idLoading: false,
    products: [],
    error: "Error"
}


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.error = action.error.message;
            })

    }
})



export default productsSlice.reducer;




