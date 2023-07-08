import React, { useState, ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    const [show, setShow] = useState(false)
    return (
        <>
            <Header handleMenu={() => setShow(!show)} />
            <div className='relative md:flex bg-stone-700 text-white min-h-[calc(100vh-48px)]'>
                {show && <Sidebar />}
                <div className='p-5 w-full mt-5'>{children}</div>
            </div>
        </>
    )
}

export default Layout