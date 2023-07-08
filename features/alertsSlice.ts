import { Alert, DATAALERTS, DATAPAYMENTS, DATAPRICES, DATATICKETS, Payment, Price, Ticket } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalState } from "./store"

const { createSlice } = require("@reduxjs/toolkit")

interface State {
    alerts: Alert[],
    status: string,
    error: string | null,
}

const initialState: State = {
    alerts: DATAALERTS,
    status: "idle",
    error: null,
}

const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        add(state: State, action: PayloadAction<Alert>) {
            console.log(state)
        },
        update(state: State, action: PayloadAction<Alert>) {
            console.log("en update")
        }
    },
})

export const selectAlerts = (state: GlobalState) => state.alerts

export const actionAlerts = alertSlice.actions

export default alertSlice.reducer