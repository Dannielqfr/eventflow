import { DATAPEOPLE, Person } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalState } from "./store"

const { createSlice } = require("@reduxjs/toolkit")

interface State {
    people: Person[],
    status: string,
    error: string | null,
}

const initialState: State = {
    people: DATAPEOPLE,
    status: "idle",
    error: null,
}

const peopleSlice = createSlice({
    name: "people",
    initialState,
    reducers: {
        add(state: State, action: PayloadAction<Person>) {
            console.log(state)
            // state.people.push(action.payload)
        },
        update(state: State, action: PayloadAction<Person>) {
            // const arr = state.people.map(p=>{
            //     if (p.idperson===action.payload.idperson) {
            //         return action.payload
            //     }
            //     return p
            // })
            // state.people=arr
        }
    },
})

export const selectPeople = (state: GlobalState) => state.people

export const actionPeople = peopleSlice.actions

export default peopleSlice.reducer