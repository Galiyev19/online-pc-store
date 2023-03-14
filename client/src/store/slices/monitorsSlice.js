import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {db} from '../../firebase'
import { collection, getDocs } from 'firebase/firestore'

export const fetchMonitors = createAsyncThunk('/monitors/fetchMonitors', async () => {
    const colRef = collection(db, 'monitors')

    const docSnap = await getDocs(colRef);

    const data = docSnap.docs.map(item => item.data())

    return data

})

const initialState = {
    idLoading: false,
    monitors: [],
    error: "Error"
}

 const monitorsSlice = createSlice ({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMonitors.pending, (state,action) => {
            state.isLoading = true
        })
        .addCase(fetchMonitors.fulfilled, (state, action) => {
            state.isLoading = false
            state.monitors = action.payload
        })
        .addCase(fetchMonitors.rejected, (state,action) => {
            state.error = action.error.message;
        })

    }

})


export default monitorsSlice.reducer