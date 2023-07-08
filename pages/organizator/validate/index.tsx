import Pencil from '@/components/icons/Pencil'
import Trash from '@/components/icons/Trash'
import InputSubmit from '@/components/inputs/InputSubmit'
import InputText from '@/components/inputs/InputText'
import Layout from '@/components/layout/Layout'
import Popup from '@/components/layout/Popup'
import { selectAllevents } from '@/features/alleventsSlice'
import { selectPeople } from '@/features/peopleSlice'
import { selectUsers } from '@/features/usersSlice'
import { AllEvent, User } from '@/types'
import React, { useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'

const Index = () => {
  const { user } = useSelector(selectUsers)
  const { people } = useSelector(selectPeople)
  const { allevents } = useSelector(selectAllevents)

  const events = allevents.filter(f => f.idorganizer === user?.idperson && f.state === 7)

  const columns: TableColumn<AllEvent>[] = [
    {
      name: "TITULO DE EVENTO",
      selector: (row: AllEvent) => row.eventtitle,
      sortable: true,
      center: true,
      reorder: true,
    },
    {
      name: "FECHA",
      selector: (row: AllEvent) => row.eventday,
      sortable: true,
      center: true,
      reorder: true,
      grow: 2
    },
    {
      name: "LUGAR",
      selector: (row: AllEvent) => row.address,
      sortable: true,
      center: true,
      reorder: true,
      grow: 2
    },
  ];

  return (
    <>
      <Layout>
        <DataTable
          title="Eventos Pendientes Validación"
          pagination
          data={events}
          columns={columns}
          noDataComponent="No existen datos para mostrar"
          theme="solarized"
        />
      </Layout>
    </>
  )
}

export default Index