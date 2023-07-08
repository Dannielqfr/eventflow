import { AllEvent, DATAALLEVENTS, User } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalState } from "./store"

const { createSlice } = require("@reduxjs/toolkit")

interface State {
    allevents: AllEvent[],
    status: string,
    error: string | null,
}

const initialState: State = {
    allevents: DATAALLEVENTS,
    status: "idle",
    error: null,
}

const alleventSlice = createSlice({
    name: "allevent",
    initialState,
    reducers: {
        validate(state: State, action: PayloadAction<AllEvent>) {
            const events = state.allevents.map(e => {
                if (e.idevent === action.payload.idevent) {
                    e.state = 1
                }
                return e
            })
            state.allevents = events
        },
        decline(state: State, action: PayloadAction<AllEvent>) {
            const events = state.allevents.map(e => {
                if (e.idevent === action.payload.idevent) {
                    e.state = 8
                }
                return e
            })
            state.allevents = events
        },
        create(state: State, action: PayloadAction<AllEvent>) {
            console.log("creando ando")
            state.allevents.push(action.payload)
        },
        update(state: State, action: PayloadAction<AllEvent>) {
            const events = state.allevents.map(e => {
                if (e.idevent === action.payload.idevent) {
                    return action.payload
                }
                return e
            })
            state.allevents = events
        }

    },
})

export const selectAllevents = (state: GlobalState) => state.allevents

export const actionAllevents = alleventSlice.actions

export default alleventSlice.reducer