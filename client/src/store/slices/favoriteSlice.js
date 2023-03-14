import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    idLoading: false,
    favorites: [],
    error: "Error"
}

const favoriteSlice = createSlice ({
    name: 'categories',
    initialState,
    reducers: {
        //ADD TO ITEM IN FAV
        addFavorite : (state, action) => {
            const idx = state.favorites.findIndex(item => item.id === action.payload.id)

            if(!state.favorites[idx]){
                state.favorites.push(action.payload)
            }else{
                return
            }
        },

        clearFav: (state, action) => {
            state.favorites = []
        }
    },
})


export default favoriteSlice.reducer
export  const { addFavorite, clearFav } = favoriteSlice.actions