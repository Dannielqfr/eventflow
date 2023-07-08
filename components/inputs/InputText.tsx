import React from 'react'

interface Props {
    placeholder: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText = ({ placeholder, name, value, onChange }: Props) => {
    return (
        <>
            <input name={name} value={value} onChange={onChange} className='py-2 rounded-sm bg-slate-700 text-slate-300 px-2 text-md font-normal w-full outline-blue-600' placeholder={placeholder} />
        </>
    )
}

export default InputText