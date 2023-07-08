import EventBigCard from '@/components/cards/EventBigCard'
import UserCard from '@/components/cards/UserCard'
import Layout from '@/components/layout/Layout'
import Popup from '@/components/layout/Popup'
import { actionAllevents, selectAllevents } from '@/features/alleventsSlice'
import { selectPeople } from '@/features/peopleSlice'
import { selectPrices } from '@/features/pricesSlice'
import { actionUsers, selectUsers } from '@/features/usersSlice'
import { AllEvent, User } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface PopupValidateInt {
  event: AllEvent
  show: boolean
}
interface PopupValidateUserInt {
  user: User
  show: boolean
}

const cleaned = { idevent: 0, idorganizer: 0, eventday: "", eventtitle: "", capacity: 0, mustbeidentified: false, department: "", province: "", district: "", address: "", isvirtual: false, img: "", state: 0 }

const cleaneduser = { iduser: 0, idperson: 0, state: 0, userrole: 0, username: "", userpass: "" }


const Index = () => {
  const dispatch = useDispatch()
  const { allevents } = useSelector(selectAllevents)
  const { users } = useSelector(selectUsers)
  const { people } = useSelector(selectPeople)
  const { prices } = useSelector(selectPrices)
  const usersforvalidate = users.filter(u => u.state === 7)
  const eventsforvalidate = allevents.filter(e => e.state === 7)

  const [popupValidate, setPopupValidate] = useState<PopupValidateInt>({
    event: cleaned,
    show: false,
  })

  const [popupValidateUser, setPopupValidateUser] = useState<PopupValidateUserInt>({
    user: cleaneduser,
    show: false
  })

  const handleValidationEvent = (e: AllEvent) => {
    const eventcopy = { ...e }
    const eventprices = prices.filter(p => p.idevent === e.idevent)
    eventcopy.prices = eventprices
    setPopupValidate({ event: eventcopy, show: true })
  }
  const handleValidationUser = (u: User) => {
    const usercopy = { ...u }
    const userperson = people.filter(p => p.idperson === u.idperson)
    if (userperson.length === 1) {
      usercopy.person = userperson[0]
    }
    setPopupValidateUser({ user: usercopy, show: true })
  }

  const handleValidate = () => {
    dispatch(actionAllevents.validate(popupValidate.event))
    setPopupValidate({ event: cleaned, show: false })
  }
  const handleDecline = () => {
    dispatch(actionAllevents.decline(popupValidate.event))
    setPopupValidate({ event: cleaned, show: false })
  }
  const handleValidateUser = () => {
    dispatch(actionUsers.validateuser(popupValidateUser.user))
    setPopupValidateUser({ user: cleaneduser, show: false })
  }
  const handleDeclineUser = () => {
    dispatch(actionUsers.decline(popupValidateUser.user))
    setPopupValidateUser({ user: cleaneduser, show: false })
  }

  return (
    <>
      {popupValidate.show &&
        <Popup title={popupValidate.event.eventtitle} handleClose={() => setPopupValidate({ ...popupValidate, show: false })}>
          <Image alt='Imagen' src={`/${popupValidate.event.img}`} width={400} height={400} className='mx-auto my-2' />
          <p className='text-center'>{popupValidate.event.eventday}</p>
          <p className='text-center'>{popupValidate.event.address}</p>
          <span className='text-center'>Precios:
            {popupValidate.event.prices?.map(p => {
              return <p className='pl-2' key={p.idprice}>{`${p.price}.00`}</p>
            })}
          </span>
          <div className='mt-3 flex justify-around'>
            <span onClick={handleValidate} className='bg-purple-700 px-3 py-1 text-white rounded cursor-pointer'>Validar evento</span>
            <span onClick={handleDecline} className='bg-red-700 px-3 py-1 text-white rounded cursor-pointer'>Rechazar</span>
          </div>
        </Popup>}

      {popupValidateUser.show &&
        <Popup title={`${popupValidateUser.user.person?.personnames} ${popupValidateUser.user.person?.personlastnames}`} handleClose={() => setPopupValidateUser({ ...popupValidateUser, show: false })}>
          <Image alt='Imagen' src={`/dni`} width={400} height={400} className='mx-auto my-2' />
          <p className='text-center'>{popupValidateUser.user.person?.personnames}</p>
          <p className='text-center'>{popupValidateUser.user.person?.personlastnames}</p>
          <p className='text-center'>{popupValidateUser.user.person?.documenttype === 1 ? "DNI" : "Carné Extranjeria"} {popupValidateUser.user.person?.documentnumber}</p>
          <p className='text-center'>{popupValidateUser.user.person?.district}</p>

          <div className='mt-3 flex justify-around'>
            <span onClick={handleValidateUser} className='bg-purple-700 px-3 py-1 text-white rounded cursor-pointer'>Validar</span>
            <span onClick={handleDeclineUser} className='bg-red-700 px-3 py-1 text-white rounded cursor-pointer'>Rechazar</span>
          </div>
        </Popup>}

      <Layout>
        <div className='p-5 bg-stone-800 w-11/12 mx-auto'>
          <h2 className='text-lg mb-2'>Validaciones pendientes - Eventos</h2>
          <div className='mx-auto flex flex-wrap gap-5 justify-center'>
            {eventsforvalidate.map(e => {
              return (<div onClick={() => handleValidationEvent(e)} className='cursor-pointer' key={e.idevent}>
                <EventBigCard event={e} />
              </div>)
            })}
          </div>
          <h2 className='text-lg mb-2 mt-5'>Validaciones pendientes - Usuarios</h2>
          <div className='mx-auto flex flex-wrap gap-2'>
            {usersforvalidate.map(u => {
              const user = { ...u }
              people.forEach(person => {
                if (person.idperson === u.idperson) {
                  user.person = person
                }
              });
              return (<div onClick={() => handleValidationUser(u)} className='mx-auto cursor-pointer' key={user.iduser}>
                <UserCard user={user} />
              </div>)
            })}
          </div>

        </div>
      </Layout>
    </>
  )
}

export default Index