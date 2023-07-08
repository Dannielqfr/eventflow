import User from '@/components/icons/User'
import InputPass from '@/components/inputs/InputPass'
import InputSubmit from '@/components/inputs/InputSubmit'
import InputText from '@/components/inputs/InputText'
import { actionUsers, selectUser, selectUsers } from '@/features/usersSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export interface UserForm {
    username: string
    userpass: string
}

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const [userform, setUserform] = useState<UserForm>({
        username: "",
        userpass: ""
    })
    const { users } = useSelector(selectUsers)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserform({ ...userform, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(actionUsers.login(userform))
        users.map(u=>{
            if (u.username===userform.username && u.userpass===userform.userpass) {
                if (u.userrole===1) {
                    router.push("/admin/validate")
                }
                if (u.userrole===2) {
                    router.push("/organizator/generalview")
                }
                if (u.userrole===3) {
                    router.push("/client/populars")
                }
            }
        })
    }

    return (
        <>
            <main className="bg-stone-900 w-screen text-white min-h-screen">
                <section className='bg-stone-800 flex flex-row justify-between px-16 h-14 items-center'>
                    <div className='font-bold text-2xl'>EventFlow</div>
                    <div className='flex gap-6 font-semibold items-center'>
                        <div className='hidden md:inline-block'>Nuestros Socios</div>
                        <div className='hidden md:inline-block'>Nosotros</div>
                        <div className='hidden md:inline-block'>Contáctanos</div>
                        <Link href="#"><User /></Link>
                    </div>
                </section>
                <section className='md:flex md:items-center bg-slate-950 min-h-screen'>
                    <form onSubmit={handleSubmit} className='bg-slate-900 px-4 pt-12 flex flex-col gap-5 min-h-screen md:w-3/6 md:m-auto md:min-h-fit lg:w-4/12 xl:w-3/12 md:p-10 md:rounded-md'>
                        <h1 className='text-2xl text-center font-extrabold'>Iniciar Sesión</h1>
                        <InputText
                            placeholder='@ Correo'
                            name='username'
                            value={userform.username}
                            onChange={handleChange}
                        />
                        <InputPass
                            placeholder='Contraseña'
                            name='userpass'
                            value={userform.userpass}
                            onChange={handleChange}
                        />
                        <InputSubmit value='Ingresar' />
                        <span className='font-extralight italic text-right text-xs'>Regístrate</span>
                    </form>
                </section>
            </main>
        </>
    )
}

export default Login