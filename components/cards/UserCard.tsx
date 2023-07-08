import { AllEvent, User } from '@/types'
import Image from 'next/image'
import React from 'react'

interface Props {
    user: User
}

const UserCard = ({ user }: Props) => {

    return (
        <div className='bg-stone-600 w-48 p-3 rounded-md my-1 text-sm'>
            <h2>Nombres:</h2>
            <p>{user.person?.personnames} {user.person?.personlastnames}</p>
            <p>Solicitado en: {user?.required}</p>
        </div>
    )
}

export default UserCard