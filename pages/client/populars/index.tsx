import InputText from '@/components/inputs/InputText'
import Layout from '@/components/layout/Layout'
import Popup from '@/components/layout/Popup'
import { selectAllevents } from '@/features/alleventsSlice'
import { selectPrices } from '@/features/pricesSlice'
import { actionTickets, selectTickets } from '@/features/ticketsSlice'
import { selectUsers } from '@/features/usersSlice'
import { AllEvent, Price, Ticket } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface PopupBuyTicketInt {
  show: boolean,
  ticket: Ticket,
  event: AllEvent,
  detail: boolean
}

const clean = { idticket: 0, idprice: 0, idclient: 0, ticketdate: "2000-01-01", qrcode: "", quantitybought: 0, quantitypresent: 0, state: 0 }
const cleanEvent = { idevent: 0, idorganizer: 0, eventday: "", eventtitle: "", capacity: 0, mustbeidentified: false, department: "", province: "", district: "", address: "", isvirtual: false, img: "", state: 0 }

const Index = () => {
  const dispatch = useDispatch()

  const { tickets } = useSelector(selectTickets)
  const { user } = useSelector(selectUsers)
  const { prices } = useSelector(selectPrices)
  const { allevents } = useSelector(selectAllevents)

  const [amount, setAmount] = useState(0)
  const [qnt, setQnt] = useState(1)
  const [popupBuyTicket, setPopupBuyTicket] = useState<PopupBuyTicketInt>({
    show: false,
    ticket: clean,
    event: cleanEvent,
    detail: false
  })

  const detailtickets = tickets.map(t => {
    const ticketcopy = { ...t }
    prices.forEach(price => {
      if (t.idprice === price.idprice) {
        ticketcopy.price = price
      }
    });
    return ticketcopy
  })

  const events = allevents.map(e => {
    let acc = 0
    const eventcopy = { ...e }
    detailtickets.forEach(t => {
      if (t.price?.idevent === e.idevent) {
        acc += t.quantitybought
      }
    });
    const pricesbyevent = prices.filter(p => p.idevent === e.idevent)
    eventcopy.selled = acc
    eventcopy.prices = pricesbyevent
    return eventcopy
  })

  const handlePopup = (e: AllEvent) => {
    setPopupBuyTicket({ ...popupBuyTicket, event: e, show: true })
  }

  const handleChoose = (p: Price) => {
    setPopupBuyTicket({ ...popupBuyTicket, ticket: { ...popupBuyTicket.ticket, idprice: p.idprice }, detail: true })
    setAmount(p.price)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQnt(+e.target.value)
  }

  const handleSubmit = () => {
    const date = new Date()
    let dd = `${date.getUTCFullYear()}-0${date.getUTCMonth()}-0${date.getDate()}`
    const tkt = {
      idticket: tickets.length + 1,
      idprice: popupBuyTicket.ticket.idprice,
      idclient: user?.iduser,
      ticketdate: dd,
      qrcode: "",
      quantitybought: qnt,
      quantitypresent: 0,
      state: 1
    }
    dispatch(actionTickets.create(tkt))
    setPopupBuyTicket({
      detail: false,
      event: cleanEvent,
      show: false,
      ticket: clean
    })
  }

  return (
    <>
      {popupBuyTicket.show &&
        <Popup title={popupBuyTicket.event.eventtitle} handleClose={() => setPopupBuyTicket({ ...popupBuyTicket, show: false })}>
          <Image alt='Imagen' src={`/${popupBuyTicket.event.img}`} width={400} height={400} className='mx-auto my-2' />
          <p className='text-center'>Día: {popupBuyTicket.event.eventday}</p>
          <p className='text-center'>Lugar {popupBuyTicket.event.address}</p>
          <p className='text-center'>Entradas disponibles: {popupBuyTicket.event.capacity && popupBuyTicket.event.selled ? (popupBuyTicket.event.capacity - popupBuyTicket.event.selled) >= 11 ? "Más de 10 entradas" : popupBuyTicket.event.capacity - popupBuyTicket.event.selled : "Disponible"}</p>
          <div className='text-center flex gap-3'>Precios:
            {popupBuyTicket.event.prices?.map(p => {
              return (<div onClick={() => handleChoose(p)} className='cursor-pointer bg-purple-500 w-fit px-3 py-2 rounded text-white' key={p.idprice}><p className='pl-2' >{`${p.price}.00`}</p></div>)
            })}
          </div>
          {popupBuyTicket.detail &&
            <div className='mt-3 flex justify-around flex-col'>
              <h2 className='font-bold text-lg uppercase my-3'>Elije su medio de pago</h2>
              <div className='flex gap-5'>
                <div className='flex flex-col p-5 mx-auto border-[1px] rounded bg-stone-200'>
                  <p>Tarjeta Master Card</p>
                  <p>74458*****748*****4</p>
                </div>
                <div className='flex flex-col p-5 mx-auto border-[1px] rounded bg-stone-200 justify-center cursor-pointer'>
                  <p>Añadir Tarjeta</p>
                </div>
              </div>
              Cantidad <InputText name='' onChange={handleChange} placeholder='1' value={`${qnt}`} />
              <p className='text-right font-semibold text-lg my-2'>Total: S/ {qnt * amount}.00</p>
              <button onClick={handleSubmit} className='bg-green-600 w-fit px-4 py-2 mx-auto rounded text-white'>Finalizar Compra</button>
            </div>
          }
        </Popup>}
      <Layout>
        <div className='p-5 bg-stone-800 w-11/12 mx-auto rounded'>
          <h2 className='text-lg mb-2 mt-5'>Próximos Eventos</h2>
          <div className='mx-auto flex flex-wrap gap-5'>
            {events.map(e => {
              return <div onClick={() => handlePopup(e)} className='cursor-pointer w-60 flex flex-col items-center justify-center' key={e.idevent}>
                <Image src={`/${e.img}`} alt='Imagen' width={400} height={400} />
                <span className='text-sm'>{e.eventtitle} - {e.eventday}</span>
              </div>
            })}
          </div>

        </div>
      </Layout>
    </>
  )
}

export default Index