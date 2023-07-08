import { AllEvent } from '@/types'
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode
    title: string
    handleClose: () => void
}

const Popup = ({ children, title, handleClose }: Props) => {
    return (
        <div className='absolute z-10 w-screen h-screen flex justify-center items-center bg-stone-950 bg-opacity-90'>
            <div className='bg-stone-300 w-10/12 md:w-7/12 rounded-md min-h-[200px] p-5'>
                <div className='border-b-[1px] uppercase flex justify-between'>
                    <h2 className='text-lg font-semibold'>{title}</h2>
                    <div className='text-red-600 rounded-full flex justify-center items-center w-6 h-6 cursor-pointer hover:bg-red-600 hover:text-red-100' onClick={handleClose}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}

export default Popup