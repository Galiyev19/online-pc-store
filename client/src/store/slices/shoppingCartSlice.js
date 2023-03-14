import {createSlice, current} from "@reduxjs/toolkit";



const initialState = {
    idLoading: false,
    shoppingCart: [],
    error: "Error"
}

const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        //ADD ITEM IN SHOPPING CART LIST
        addShoppingCart : (state, action) => {
            const idx = state.shoppingCart.findIndex(item => item.id === action.payload.id)


            if(!state.shoppingCart[idx] ){
                const obj = {
                    id: action.payload.id,
                    product: action.payload,
                    count: 1,
                    total: Math.floor(action.payload.price)
                }
                
                
                const data = JSON.parse(localStorage.getItem('history'));
                
                if(data !== null) {
                    data.push(obj)
                    localStorage.setItem('history',JSON.stringify(data))
                }else{
                    localStorage.setItem('history',JSON.stringify(state.shoppingCart))
                }
                
                state.shoppingCart.push(obj)
            }else{
                return
            }  
            
            // console.log(state.shoppingCart)
        },

        // INCREASE COUNT IN SHOPPING CART
        increaseCount: (state,action) => {
            const idx = state.shoppingCart.findIndex(item => item.id === action.payload)
       
            state.shoppingCart[idx].count += 1;
            state.shoppingCart[idx].total = Math.floor(state.shoppingCart[idx].count * state.shoppingCart[idx].product.price)
        },
        // DECREASE COUNT IN SHOPPING CART
        decreaseCount: (state, action) => {
            const idx = state.shoppingCart.findIndex(item => item.id === action.payload)
            if(state.shoppingCart[idx].count === 1){
                return
            }else{
                state.shoppingCart[idx].count -= 1;
                state.shoppingCart[idx].total -= Math.floor(state.shoppingCart[idx].product.price)
            }
        },
        // DELETE ITEM IN SHOPPING CART
        deleteItem: (state,action) => {
            const idx = state.shoppingCart.findIndex(item => item.id === action.payload)

            state.shoppingCart = [... state.shoppingCart.slice(0, idx), ... state.shoppingCart.slice(idx + 1)]
        },
        // CLEAR C SHOPPING CART
        clearShoppingCart: (state,action) => {
            state.shoppingCart = []
        }


    },
})

export default shoppingCartSlice.reducer;
export const  {addShoppingCart, increaseCount, decreaseCount, deleteItem, clearShoppingCart} = shoppingCartSlice.actions

