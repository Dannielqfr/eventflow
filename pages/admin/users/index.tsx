import Pencil from '@/components/icons/Pencil'
import Trash from '@/components/icons/Trash'
import InputSubmit from '@/components/inputs/InputSubmit'
import InputText from '@/components/inputs/InputText'
import Layout from '@/components/layout/Layout'
import Popup from '@/components/layout/Popup'
import { selectPeople } from '@/features/peopleSlice'
import { actionUsers, selectUsers } from '@/features/usersSlice'
import { DATAPEOPLE, Person, User } from '@/types'
import React, { useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'

interface PopupEditUserInt {
  user: User
  show: boolean
}

const cleaneduser = { iduser: 0, idperson: 0, state: 0, userrole: 0, username: "", userpass: "" }



const Index = () => {
  const dispatch = useDispatch()

  const { users, status } = useSelector(selectUsers)
  const { people } = useSelector(selectPeople)

  const [popupUser, setPopupUser] = useState<PopupEditUserInt>({
    user: cleaneduser,
    show: false,
  })

  const filtered = users.filter(f => f.state === 1)

  const usersdata = filtered.map(u => {
    const usercopy = { ...u }
    const matchedPerson = people.find(person => person.idperson === u.idperson)
    if (matchedPerson) {
      usercopy.person = matchedPerson
    }
    return usercopy
  })

  const columns: TableColumn<User>[] = [
    {
      name: "NOMBRE Y APELLIDO",
      selector: (row: User) => row.person?.personnames + " " + row.person?.personlastnames,
      sortable: true,
      center: true,
      reorder: true,
      grow: 2
    },
    {
      name: "DIRECCION",
      selector: (row: User) => row.person?.address || "",
      sortable: true,
      center: true,
      reorder: true,
      grow: 2
    },
    {
      name: "DISTRITO",
      selector: (row: User) => row.person?.district || "",
      sortable: true,
      center: true,
      reorder: true,
    },
    {
      name: "PROVINCIA",
      selector: (row: User) => row.person?.province || "",
      sortable: true,
      center: true,
      reorder: true,
    },
    {
      name: "DEPARTAMENTO",
      selector: (row: User) => row.person?.department || "",
      sortable: true,
      center: true,
      reorder: true,
    },
    {
      name: "USUARIO",
      selector: (row: User) => row.username || "",
      sortable: true,
      center: true,
      reorder: true,
    },
    {
      name: "ACCIONES",
      selector: (row: User) => {
        return row.idperson
      },
      cell: (row: User) => {
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

  const handleDeleteAction = (row: User) => {
    dispatch(actionUsers.decline(row))
  }

  const handleEditAction = (row: User) => {
    setPopupUser({ user: row, show: true })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPopupUser({
      show: true,
      user: { ...popupUser.user, [e.target.name]: e.target.value }
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(actionUsers.update(popupUser.user))
    setPopupUser({ show: false, user: cleaneduser })
  }

  return (
    <>
      {popupUser.show &&
        <Popup title="Editar Usuario" handleClose={() => setPopupUser({ ...popupUser, show: false })}>
          <form className='py-5 w-10/12 mx-auto flex gap-3 flex-col' onSubmit={handleSubmit}>
            <InputText onChange={handleChange} name='username' value={popupUser.user.username} placeholder='Usuario' />
            <InputText onChange={handleChange} name='userpass' value={popupUser.user.userpass} placeholder='Contraseña' />
            <InputSubmit value='Grabar' />
          </form>
        </Popup>}
      <Layout>
        {status === "succeeded" &&
          <DataTable
            title="Usuarios Activos"
            pagination
            data={usersdata}
            columns={columns}
            noDataComponent="No existen datos para mostrar"
          />}
      </Layout>
    </>
  )
}

export default Index