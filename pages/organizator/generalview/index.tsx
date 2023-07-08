import Layout from '@/components/layout/Layout'
import { selectAllevents } from '@/features/alleventsSlice'
import { selectPrices } from '@/features/pricesSlice'
import { selectTickets } from '@/features/ticketsSlice'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const Index = () => {
  const { tickets } = useSelector(selectTickets)
  const { prices } = useSelector(selectPrices)
  const { allevents } = useSelector(selectAllevents)

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
    eventcopy.selled = acc
    return eventcopy
  })

  return (
    <>
      <Layout>
        <div className='p-5 bg-stone-800 w-11/12 mx-auto rounded'>
          <div className='mx-auto flex flex-wrap gap-5 justify-center'>
            <Image src="/ticket.png" width={500} height={400} alt='Ticket' />
            <div className='flex gap-8'>
              {events.map(e => {
                return <div className='flex flex-col items-center' key={e.idevent}>
                  <div className='w-20 h-20 rounded-full bg-orange-400 flex items-center justify-center'>{e.selled}</div>
                  <span className='text-center'>{e.eventtitle}</span>
                </div>
              })}
            </div>
          </div>
          <h2 className='text-lg mb-2 mt-5'>Próximos Eventos</h2>
          <div className='mx-auto flex flex-wrap gap-5'>
              {allevents.map(e=>{
                return <div className='w-60 flex flex-col items-center justify-center' key={e.idevent}>
                  <Image src={`/${e.img}`} alt='Imagen' width={400} height={400}/>
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