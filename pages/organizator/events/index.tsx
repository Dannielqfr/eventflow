import Pencil from '@/components/icons/Pencil'
import Trash from '@/components/icons/Trash'
import InputSubmit from '@/components/inputs/InputSubmit'
import InputText from '@/components/inputs/InputText'
import Layout from '@/components/layout/Layout'
import Popup from '@/components/layout/Popup'
import { actionAllevents, selectAllevents } from '@/features/alleventsSlice'
import { selectPeople } from '@/features/peopleSlice'
import { selectPrices } from '@/features/pricesSlice'
import { selectTickets } from '@/features/ticketsSlice'
import { actionUsers, selectUsers } from '@/features/usersSlice'
import { AllEvent, DATAPEOPLE, Person, User } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'

interface PopupEditEventInt {
  event: AllEvent
  show: boolean
}

const cleaned = { idevent: 0, idorganizer: 0, eventday: "", eventtitle: "", capacity: 0, mustbeidentified: false, department: "", province: "", district: "", address: "", isvirtual: false, img: "", state: 0 }

const Index = () => {
  const dispatch = useDispatch()

  const { user, status } = useSelector(selectUsers)
  const { people } = useSelector(selectPeople)
  const { allevents } = useSelector(selectAllevents)

  const { tickets } = useSelector(selectTickets)
  const { prices } = useSelector(selectPrices)

  const [popupEvent, setPopupEvent] = useState<PopupEditEventInt>({
    event: cleaned,
    show: false,
  })

  const filtered = allevents.filter(f => f.state === 1 && f.idorganizer === user?.idperson)

  const detailtickets = tickets.map(t => {
    const ticketcopy = { ...t }
    prices.forEach(price => {
      if (t.idprice === price.idprice) {
        ticketcopy.price = price
      }
    });
    return ticketcopy
  })

  const events = filtered.map(e => {
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

  // const usersdata = filtered.map(u => {
  //   const usercopy = { ...u }
  //   const matchedPerson = people.find(person => person.idperson === u.idperson)
  //   if (matchedPerson) {
  //     usercopy.person = matchedPerson
  //   }
  //   return usercopy
  // })

  const columns: TableColumn<AllEvent>[] = [
    {
      name: "EVENTO",
      selector: (row: AllEvent) => row.eventtitle,
      sortable: true,
      center: true,
      reorder: true
    },
    {
      name: "ACCIONES",
      selector: (row: AllEvent) => {
        return row.idevent
      },
      cell: (row: AllEvent) => {
        return (
          <>
            <Pencil handleAction={() => handleEditAction(row)} />
            <Trash handleAction={() => handleDeleteAction(row)} />
          </>
        );
      },
      sortable: true,
      center: true,
      reorder: true,
    },
  ];

  const handleDeleteAction = (row: AllEvent) => {
    dispatch(actionAllevents.decline(row))
  }

  const handleEditAction = (row: AllEvent) => {
    setPopupEvent({ event: row, show: true })
  }
  const handleCreateAction = () => {
    setPopupEvent({ event: cleaned, show: true })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPopupEvent({
      show: true,
      event: { ...popupEvent.event, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (popupEvent.event.idevent === 1) {
      // editar
    } else {
      const cleaned = {
        idevent: allevents.length + 1,
        idorganizer: user?.iduser,
        eventday: popupEvent.event.eventday,
        eventtitle: popupEvent.event.eventtitle,
        capacity: +popupEvent.event.capacity,
        mustbeidentified: false,
        department: popupEvent.event.department,
        province: popupEvent.event.province,
        district: popupEvent.event.district,
        address: popupEvent.event.address,
        isvirtual: false,
        img: "img2.png",
        state: 7
      }
      //crear
    }

    // dispatch(actionUsers.update(popupUser.user))
    // setPopupUser({ show: false, user: cleaneduser })
  }

  return (
    <>
      {popupEvent.show &&
        <Popup title={popupEvent.event.idevent === 0 ? "Crear Evento" : "Editar Evento"} handleClose={() => setPopupEvent({ ...popupEvent, show: false })}>
          <form className='py-5 w-10/12 mx-auto flex gap-3 flex-col' onSubmit={handleSubmit}>
            <Image alt='Imagen' src="/img2.png" width={350} height={350} className='mx-auto' />
            <InputText onChange={handleChange} name='eventtitle' value={popupEvent.event.eventtitle} placeholder='Titulo' />
            <InputText onChange={handleChange} name='eventday' value={popupEvent.event.eventday} placeholder='Fecha' />
            <InputText onChange={handleChange} name='address' value={popupEvent.event.address} placeholder='Dirección' />
            <InputText onChange={handleChange} name='district' value={popupEvent.event.district} placeholder='Distrito' />
            <InputText onChange={handleChange} name='province' value={popupEvent.event.province} placeholder='Provincia' />
            <InputText onChange={handleChange} name='department' value={popupEvent.event.department} placeholder='Departamento' />
            <InputText onChange={handleChange} name='capacity' value={`${popupEvent.event.capacity}`} placeholder='Capacidad' />
            <InputSubmit value={popupEvent.event.idevent === 0 ? "Enviar a Revisión" : "Grabar"} />
          </form>
        </Popup>}

      <Layout>
        {status === "succeeded" &&
          <>
            <span onClick={handleCreateAction} className='bg-blue-500 text-white px-5 pb-3 pt-2 cursor-pointer text-center rounded mb-5 inline-block font-semibold'>Agregar</span>
            <DataTable
              title="Eventos Activos"
              pagination
              data={events}
              columns={columns}
              noDataComponent="No existen datos para mostrar"
            />
          </>
        }
      </Layout>
    </>
  )
}

export default Index