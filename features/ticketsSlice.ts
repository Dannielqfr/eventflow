import { DATAPRICES, DATATICKETS, Price, Ticket } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalState } from "./store"

const { createSlice } = require("@reduxjs/toolkit")

interface State {
    tickets: Ticket[],
    status: string,
    error: string | null,
}

const initialState: State = {
    tickets: DATATICKETS,
    status: "idle",
    error: null,
}

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        add(state: State, action: PayloadAction<Ticket>) {
            console.log(state)
        },
        update(state: State, action: PayloadAction<Ticket>) {
            console.log("en update")
        }
    },
})

export const selectTickets = (state: GlobalState) => state.tickets

export const actionTickets = ticketSlice.actions

export default ticketSlice.reducer