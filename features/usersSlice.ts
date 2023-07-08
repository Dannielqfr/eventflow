import { UserForm } from "@/pages/login"
import { DATAPEOPLE, DATAUSERS, Person, User } from "@/types"
import { PayloadAction } from "@reduxjs/toolkit"
import { GlobalState } from "./store"

const { createSlice } = require("@reduxjs/toolkit")

interface State {
    users: User[],
    isLogged: boolean,
    user: User | null,
    status: string,
    error: string | null,
}

const initialState: State = {
    users: DATAUSERS,
    isLogged: false,
    user: null,
    status: "idle",
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state: State, action: PayloadAction<UserForm>) {
            state.status = 'loading'
            console.log("login")
            const payload = action.payload
            const selectuser = state.users.filter(u => {
                return u.username === payload.username && u.userpass === payload.userpass
            })
            if (selectuser.length !== 1) {
                state.status = 'succeeded'
                state.error = 'Usuario y/o contraseña erradas.'
                return
            }

            const myfuturecookie = `idperson=${selectuser[0].idperson};max-age=${60 * 60 * 11
                }; path=/; samesite=strict`
            document.cookie = myfuturecookie

            state.status = 'succeeded'
            state.error = null
            state.isLogged = true
            state.user = selectuser[0]
        },
        logout(state: State, action: PayloadAction<User>) {
            state.status = 'loading'
            state.user = null
            state.isLogged = false
            state.error = null
            const token = document.cookie.replace("idperson=", "");
            document.cookie = `idperson=${token};Path=/;Expires=Thu, 01 Jan 1970 00:00:01 GMT`;
            state.status = 'succeeded'
        },
        validate(state: State, action: PayloadAction<User>) {
            const token = +document.cookie.replace("idperson=", "");
            if (Boolean(token) === false) {
                return
            }
            const selectuser = state.users.filter(u => {
                return u.idperson === token
            })
            if (selectuser.length !== 1) {
                state.status = 'succeeded'
                state.error = 'Usuario y/o contraseña erradas.'
                return
            }
            state.status = 'succeeded'
            state.error = null
            state.isLogged = true
            state.user = selectuser[0]
        },
        validateuser(state: State, action: PayloadAction<User>) {
            const updatedusers = state.users.map(u => {
                if (u.iduser === action.payload.iduser) {
                    u.state = 1
                }
                return u
            })
            state.users = updatedusers
        },
        decline(state: State, action: PayloadAction<User>) {
            const updatedusers = state.users.map(u => {
                if (u.iduser === action.payload.iduser) {
                    u.state = 8
                }
                return u
            })
            state.users = updatedusers
        },
        update(state: State, action: PayloadAction<User>) {
            const updatedusers = state.users.map(u => {
                if (u.iduser === action.payload.iduser) {
                    return action.payload
                }
                return u
            })
            state.users = updatedusers
        }
    },
})

export const selectUsers = (state: GlobalState) => state.users
export const selectUser = (state: GlobalState) => state.users.user

export const actionUsers = userSlice.actions

export default userSlice.reducer

