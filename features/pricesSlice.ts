import { DATAPRICES, Price } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalState } from "./store"

const { createSlice } = require("@reduxjs/toolkit")

interface State {
    prices: Price[],
    status: string,
    error: string | null,
}

const initialState: State = {
    prices: DATAPRICES,
    status: "idle",
    error: null,
}

const priceSlice = createSlice({
    name: "price",
    initialState,
    reducers: {
        add(state: State, action: PayloadAction<Price>) {
            console.log(state)
        },
        update(state: State, action: PayloadAction<Price>) {
            console.log("en update")
        }
    },
})

export const selectPrices = (state: GlobalState) => state.prices

export const actionPrices = priceSlice.actions

export default priceSlice.reducer