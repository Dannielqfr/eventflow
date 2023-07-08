export const DATAPEOPLE: Person[] = [
    { idperson: 1, personnames: "Andres", personlastnames: "Palacios Munive", documenttype: 1, documentnumber: "12345678", address: "Calle Las Dalias 458", department: "Lima", province: "Lima", district: "Ate" },
    { idperson: 2, personnames: "Lorena", personlastnames: "Bautista Olivares", documenttype: 1, documentnumber: "23456789", address: "Calle Los Ingenieros 123", department: "Lima", province: "Lima", district: "Miraflores" },
    { idperson: 3, personnames: "Nayeli", personlastnames: "Perez Huaman", documenttype: 1, documentnumber: "34567891", address: "Av. Alfonso Ugarte 7815", department: "Lima", province: "Lima", district: "Cercado de Lima" },
    { idperson: 4, personnames: "Macarena", personlastnames: "Flores Tapia", documenttype: 1, documentnumber: "45678912", address: "Jr. Nevado Salcantay Mz. G lote 20", department: "Lima", province: "Lima", district: "Santa Anita" },
    { idperson: 5, personnames: "Alan", personlastnames: "Garcia Medina", documenttype: 1, documentnumber: "56789123", address: "Av. Los Hérores", department: "Lima", province: "Lima", district: "Chosica" },
]

export const DATAUSERS: User[] = [
    { iduser: 1, idperson: 1, state: 1, userrole: 1, username: "andres", userpass: "andres123" },
    { iduser: 2, idperson: 2, state: 1, userrole: 2, username: "lorena", userpass: "lorena123" },
    { iduser: 3, idperson: 3, state: 1, userrole: 3, username: "nayeli", userpass: "nayeli123" },
    { iduser: 4, idperson: 4, state: 1, userrole: 3, username: "macarena", userpass: "macarena123" },
    { iduser: 5, idperson: 5, state: 7, userrole: 3, username: "alan", userpass: "alan123", required: "2023-07-07" },
]

export const DATAALLEVENTS: AllEvent[] = [
    { idevent: 1, idorganizer: 2, eventday: "2023-07-01", eventtitle: "Hablando Huevadas", capacity: 1000, mustbeidentified: false, department: "Lima", province: "Lima", district: "Miraflores", address: "Av. Petit Thouars 4550", isvirtual: false, img: "img1.png", state: 1 },
    { idevent: 2, idorganizer: 2, eventday: "2023-07-02", eventtitle: "Chapa tu Money", capacity: 1000, mustbeidentified: false, department: "Lima", province: "Lima", district: "Miraflores", address: "Av. Petit Thouars 4550", isvirtual: false, img: "img2.png", state: 1 },
    { idevent: 3, idorganizer: 2, eventday: "2023-07-03", eventtitle: "Gatada de Vatos", capacity: 1000, mustbeidentified: false, department: "Lima", province: "Lima", district: "Miraflores", address: "Av. Petit Thouars 4550", isvirtual: false, img: "img3.png", state: 1 },
    { idevent: 4, idorganizer: 2, eventday: "2023-07-08", eventtitle: "Hablando Huevadas", capacity: 1000, mustbeidentified: false, department: "Lima", province: "Lima", district: "Miraflores", address: "Av. Petit Thouars 4550", isvirtual: false, img: "img1.png", state: 7 },
]

export const DATAPRICES: Price[] = [
    { idprice: 1, idevent: 1, tickettype: 1, price: 169 },
    { idprice: 2, idevent: 1, tickettype: 2, price: 149 },
    { idprice: 3, idevent: 1, tickettype: 3, price: 129 },
    { idprice: 4, idevent: 2, tickettype: 1, price: 149 },
    { idprice: 5, idevent: 2, tickettype: 2, price: 119 },
    { idprice: 6, idevent: 2, tickettype: 3, price: 89 },
    { idprice: 7, idevent: 3, tickettype: 1, price: 69 },
    { idprice: 8, idevent: 3, tickettype: 2, price: 49 },
    { idprice: 9, idevent: 3, tickettype: 3, price: 29 },
    { idprice: 10, idevent: 4, tickettype: 1, price: 169 },
    { idprice: 11, idevent: 4, tickettype: 2, price: 149 },
    { idprice: 12, idevent: 4, tickettype: 3, price: 129 },
]

export const DATATICKETS: Ticket[] = [
    { idticket: 1, idprice: 1, idclient: 3, ticketdate: "2023-06-30", qrcode: "", quantitybought: 3, quantitypresent: 0, state: 6 },
    { idticket: 2, idprice: 4, idclient: 3, ticketdate: "2023-06-30", qrcode: "", quantitybought: 3, quantitypresent: 0, state: 6 },
    { idticket: 3, idprice: 1, idclient: 4, ticketdate: "2023-06-20", qrcode: "", quantitybought: 2, quantitypresent: 0, state: 6 },
]

export const DATAPAYMENTS: Payment[] = [
    { idpayment: 1, idticket: 1, paydate: "2023-06-30", amount: 507 },
    { idpayment: 2, idticket: 2, paydate: "2023-06-30", amount: 447 },
    { idpayment: 3, idticket: 3, paydate: "2023-06-20", amount: 338 },
]

export const DATAALERTS: Alert[] = []

export const DATAVOTES: Vote[] = []

export interface Person {
    idperson: number,
    personnames: string,
    personlastnames: string,
    documenttype: number,
    documentnumber: string,
    department: string,
    province: string,
    district: string,
    address: string,
}

export interface User {
    iduser: number,
    idperson: number,
    username: string,
    userpass: string,
    userrole: number,
    state: number,
    person?: Person
    required?: string,
}

export interface AllEvent {
    idevent: number,
    idorganizer: number,
    eventday: string,
    eventtitle: string,
    capacity: number,
    mustbeidentified: boolean,
    department: string,
    province: string,
    district: string,
    address: string,
    isvirtual: boolean,
    img: string,
    state: number,
    organizer?: Person,
    prices?: Price[]
    selled?:number
}

export interface Price {
    idprice: number,
    idevent: number,
    tickettype: number,
    price: number,
    event?: AllEvent,
}

export interface Ticket {
    idticket: number,
    idprice: number,
    idclient: number,
    ticketdate: string,
    qrcode: string,
    quantitybought: number,
    quantitypresent: number,
    state: number,
    price?: Price,
    client?: Person
}

export interface Payment {
    idpayment: number,
    idticket: number,
    paydate: string,
    amount: number,
    ticket?: Ticket
}

export interface Alert {
    idalert: number,
    iduser: number,
    idworker: number,
    moment: string,
    state: number,
    user?: User,
    worker?: Person
}

export interface Vote {
    idvote: number,
    idticket: number,
    votedate: string,
    stars: number,
    comments: string,
    state: number,
    ticket?: Ticket
}

// tickettype: 1 diamante, 2 oro, 3 plata
// state: 1 activo, 2 inactivo, 3 bloqueado, 4 eliminado, 5 evento terminado, 6 ticket pagado, 7 pendiente de aprobacion, 8 rechazado
// rol: 1 admin, 2 evetflower, 3 participante, 4 security
