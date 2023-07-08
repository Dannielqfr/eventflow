import { actionUsers, selectUser, selectUsers } from '@/features/usersSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Sidebar = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const selecteduser = useSelector(selectUser)
  console.log("🚀 ~ file: Sidebar.tsx:11 ~ Sidebar ~ selecteduser:", selecteduser)

  const handle = () => {
    dispatch(actionUsers.logout())
    router.push("/login")
  }
  return (
    <>
      <div className='absolute md:relative top-0 flex flex-col gap-3 w-[250px] min-h-[calc(100vh-48px)] px-7 py-10 bg-stone-950 text-white'>
        {selecteduser?.userrole == 1 &&
          <>
            <Link href="/admin/validate">Validar</Link>
            <Link href="/admin/users">Buscar Usuarios</Link>
          </>
        }
        {selecteduser?.userrole == 2 &&
          <>
            <Link href="/organizator/generalview">Vista General</Link>
            <Link href="/organizator/validate">Validaciones Pendientes</Link>
            <Link href="/organizator/events">Mis Eventos</Link>
          </>
        }
        {selecteduser?.userrole == 3 &&
          <>
            <Link href="/client/populars">Populares</Link>
            <Link href="/client/tickets">Mis entradas</Link>
          </>
        }
        <div className='cursor-pointer' onClick={handle}>Cerrar Sesión</div>
      </div>
    </>
  )
}

export default Sidebar