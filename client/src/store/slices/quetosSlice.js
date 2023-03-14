import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


export const fetchQuetos = createAsyncThunk('quetos/fetchQuetos', async () => {
    //  const response = await fetch("https://type.fit/api/quotes");
     const response = await fetch("/api/products")
     
     const data = await response.json()
     return data;
 })


const initialState = {
    idLoading: false,
    quetos: [],
    error: "",
}


const quetosSlice = createSlice({
    name: "quetos",
    initialState,
    extraReducers:(builder) => {
        builder
        .addCase(fetchQuetos.pending, (state,action) => {
            state.isLoading = true
        })
        .addCase(fetchQuetos.fulfilled, (state, action) => {
            state.isLoading = false
            state.quetos = action.payload
        })
        .addCase(fetchQuetos.rejected, (state,action) => {
            state.error = action.error.message;
        })
    }
})

export default quetosSlice.reducer;
