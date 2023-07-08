import { Alert, DATAALERTS, DATAPAYMENTS, DATAPRICES, DATATICKETS, DATAVOTES, Payment, Price, Ticket, Vote } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalState } from "./store"

const { createSlice } = require("@reduxjs/toolkit")

interface State {
    votes: Vote[],
    status: string,
    error: string | null,
}

const initialState: State = {
    votes: DATAVOTES,
    status: "idle",
    error: null,
}

const voteSlice = createSlice({
    name: "vote",
    initialState,
    reducers: {
        add(state: State, action: PayloadAction<Vote>) {
            console.log(state)
        },
        update(state: State, action: PayloadAction<Vote>) {
            console.log("en update")
        }
    },
})

export const selectVotes = (state: GlobalState) => state.votes

export const actionVotes = voteSlice.actions

export default voteSlice.reducer