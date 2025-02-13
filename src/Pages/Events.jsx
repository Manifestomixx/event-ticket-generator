import React from 'react'
import { Outlet } from 'react-router-dom';


const Events = () => {

  return (
    <>
    <main className="md:min-h-dvh md:p-10 bg-[url('/src/assets/background.svg')] bg-no-repeat bg-cover bg-center flex justify-center text-white ">
    
    
    <Outlet/>
    </main>
    </>
  )
}

export default Events