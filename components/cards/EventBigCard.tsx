import { AllEvent } from '@/types'
import Image from 'next/image'
import React from 'react'

interface Props {
    event: AllEvent
}

const EventBigCard = ({ event }: Props) => {

    return (
        <div className='bg-stone-600 w-48 p-3 rounded-md my-1'>
            <Image src={`/${event.img}`} alt='Imagen' width={150} height={150} className='mx-auto my-1' />
            <h3 className='text-center font-semibold my-1'>{event.eventtitle}</h3>
            <h3 className='text-sm text-center'>{event.eventday}</h3>
        </div>
    )
}

export default EventBigCard