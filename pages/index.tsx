import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import User from '@/components/icons/User'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-stone-900 w-screen text-white min-h-screen">
        <section className='bg-stone-800 flex flex-row justify-between px-16 h-14 items-center'>
          <div className='font-bold text-2xl'>EventFlow</div>
          <div className='flex gap-6 font-semibold items-center'>
            <div className='hidden md:inline-block'>Nuestros Socios</div>
            <div className='hidden md:inline-block'>Nosotros</div>
            <div className='hidden md:inline-block'>Contáctanos</div>
            <Link href="/login"><User /></Link>
          </div>
        </section>
        <section className='flex flex-col justify-center items-center'>
          <div className='md:flex md:mt-5 md:mb-5 md:ml-32'>
            <div className='p-10'>
              <h1 className='text-3xl font-extrabold'>EL FUTURO DE LA GESTIÓN DE EVENTOS</h1>
              <p className='mt-3'>La plataforma online lider en la gestión de venta de entradas para eventos de cualquier tipo.</p>
              <div className='mt-5 flex justify-around'>
                <Link className='bg-purple-500 px-3 py-1 rounded-sm' href="/login">Comenzar</Link>
                <div className='border-2 border-purple-500 px-3 py-1 rounded-sm text-purple-500'>Contáctanos</div>
              </div>
            </div>
            <div className='flex items-center'>
              <Image alt='Icono' src="/Ticket.svg" width={450} height={450} className='w-9/12 ml-5' />
              <div className='flex flex-col gap-5'>
                <Image alt='Icono' src="/svgyoutube.svg" width={30} height={30} className='bg-white rounded-full p-1' />
                <Image alt='Icono' src="/svgfacebook.svg" width={30} height={30} className='bg-white rounded-full p-1' />
                <Image alt='Icono' src="/svginstagram.svg" width={30} height={30} className='bg-white rounded-full p-1' />
              </div>
            </div>
          </div>
          <div className='p-7 flex flex-wrap justify-center gap-3'>
            <div className='border-t-2 w-72 mb-7'>
              <h3 className='text-xl font-semibold mb-1'>Portable</h3>
              <span className='font-light'>Conecta con tu audiencia en cualquier sitio con nuestra app movil</span>
            </div>
            <div className='border-t-2 w-72 mb-7'>
              <h3 className='text-xl font-semibold mb-1'>Diferente</h3>
              <span className='font-light'>Funciones incleibles que te conectarán con tu audiencia</span>
            </div>
            <div className='border-t-2 w-72 mb-7'>
              <h3 className='text-xl font-semibold mb-1'>100 %</h3>
              <span className='font-light'>Libre de exclusividad, toma el control total de tus eventos.</span>
            </div>
            <div className='border-t-2 w-72 mb-7'>
              <h3 className='text-xl font-semibold mb-1'>Y mucho más</h3>
              <span className='font-light'>Registrate ahora y potencia tus eventos con EventFLow</span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
