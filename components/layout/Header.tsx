import { selectUser } from '@/features/usersSlice';
import React from 'react'
import { useSelector } from 'react-redux';

interface Props {
    handleMenu: () => void
}

const Header = ({ handleMenu }: Props) => {
    const selecteduser = useSelector(selectUser)
    return (
        <div className='relative flex px-5 h-12 bg-stone-800 text-white items-center justify-between'>
            <div onClick={handleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <div>EVENTFLOW</div>
            <div>{selecteduser?.username}</div>
        </div>
    )
}

export default Header