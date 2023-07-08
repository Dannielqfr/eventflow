import { DATAPAYMENTS, DATAPRICES, DATATICKETS, Payment, Price, Ticket } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalState } from "./store"

const { createSlice } = require("@reduxjs/toolkit")

interface State {
    payments: Payment[],
    status: string,
    error: string | null,
}

const initialState: State = {
    payments: DATAPAYMENTS,
    status: "idle",
    error: null,
}

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        add(state: State, action: PayloadAction<Payment>) {
            console.log(state)
        },
        update(state: State, action: PayloadAction<Payment>) {
            console.log("en update")
        }
    },
})

export const selectPayments = (state: GlobalState) => state.payments

export const actionPayments = paymentSlice.actions

export default paymentSlice.reducer