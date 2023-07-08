import { configureStore } from "@reduxjs/toolkit";
import peopleSlice from "./peopleSlice";
import usersSlice from "./usersSlice";
import alertsSlice from "./alertsSlice";
import alleventsSlice from "./alleventsSlice";
import paymentsSlice from "./paymentsSlice";
import pricesSlice from "./pricesSlice";
import ticketsSlice from "./ticketsSlice";
import votesSlice from "./votesSlice";
import { Alert, AllEvent, Payment, Person, Price, Ticket, User, Vote } from "@/types";

interface StateAlert {
    alerts: Alert[],
    status: string,
    error: string | null,
}

interface StateAllevent {
    allevents: AllEvent[],
    status: string,
    error: string | null,
}

interface StatePayment {
    payments: Payment[],
    status: string,
    error: string | null,
}

interface StatePerson {
    people: Person[],
    status: string,
    error: string | null,
}

interface StatePrice {
    prices: Price[],
    status: string,
    error: string | null,
}

interface StateTicket {
    tickets: Ticket[],
    status: string,
    error: string | null,
}

interface StateUser {
    users: User[],
    isLogged: boolean,
    user: User | null,
    status: string,
    error: string | null,
}

interface StateVote {
    votes: Vote[],
    status: string,
    error: string | null,
}

export interface GlobalState {
    alerts: StateAlert
    allevents: StateAllevent
    payments: StatePayment
    people: StatePerson
    prices: StatePrice
    tickets: StateTicket
    users: StateUser
    votes: StateVote
}

export const STORE = configureStore({
    reducer: {
        alerts: alertsSlice,
        allevents: alleventsSlice,
        payments: paymentsSlice,
        people: peopleSlice,
        prices: pricesSlice,
        tickets: ticketsSlice,
        users: usersSlice,
        votes: votesSlice,
    }
})