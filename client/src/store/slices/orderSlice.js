import {createSlice, current} from "@reduxjs/toolkit";


const initialState = {
    idLoading: false,
    orders: [],
    error: "Error"
}

const orders = createSlice({
    name: "orders",
    initialState,
    reducers: {
        addOrder: (state, action) => {
            
            const obj = {
                id: state.orders.length + 1,
                order: action.payload
            }

            state.orders.push(obj)
        }
    }
})



export default orders.reducer;
export const {addOrder} = orders.actions