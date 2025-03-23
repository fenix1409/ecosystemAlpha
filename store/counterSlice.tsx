import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsType } from '../types/prodcutsType';

interface LikeState {
    orderList: ProductsType[]
}

const initialState: LikeState = {
    orderList: []
}

const likedSlice = createSlice({
    name: 'liked',
    initialState,
    reducers: {
        likedProducts: (state: LikeState, action: PayloadAction<ProductsType>) => {
            const id = state.orderList.findIndex((item: ProductsType) => item.id === action.payload.id)
            if (id === -1) {
                state.orderList.push(action.payload)
            } else {
                state.orderList[id] = action.payload
            }
        },
        deleteLikedProduct: (state: LikeState, action: PayloadAction<number>) => {
            const id = state.orderList.findIndex((item) => item.id === action.payload)
            if (id !== -1) {
                state.orderList.splice(id, 1)
            }
        },
    }
})

export const { likedProducts, deleteLikedProduct } = likedSlice.actions
export default likedSlice.reducer