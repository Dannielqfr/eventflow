import React from 'react'

interface Props {
    value: string
}

const InputSubmit = ({ value }: Props) => {
    return (
        <>
            <button className='text-white bg-green-700 px-4 py-2 rounded-md font-semibold'>{value}</button>
        </>
    )
}

export default InputSubmit