import React from 'react'
import { Outlet , Link , useLocation } from 'react-router-dom'
import logoIcon from '../assets/logo.png'
import { FaArrowRightLong } from "react-icons/fa6";

const NavBar = () => {
    const navLinks = [
        {name: "Events", link: "/events"},
        {name: "My Tickets", link: "/tickets"},
        {name: "About Project", link: "/about"},
    ];

    const location = useLocation();
  return (
    <>
    <nav className='relative w-full z-10 bg-[#02191D] bg-opacity-90 backdrop-blur-sm px-9 md:px-[7rem] py-8 flex items-center justify-between '>
    <div className='flex justify-between w-full border border-[#197686] p-3 items-center rounded-2xl '>
        <div>
            <Link to="/">
            <img src={logoIcon} alt="brand-logo" className="w-16 h-auto" />
            </Link>
        </div>
        <div className='hidden md:block'>
            <ul className='flex gap-5'>
                {navLinks.map((link) => (
                    <li key={link.name}>
                        <Link to={link.link} className={`${location.pathname === link.link ? "text-white" : "text-[#B3B3B3]"}`}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        <div>
            <button className='px-3 py-2 rounded-2xl gap-3 flex items-center cursor-pointer bg-white text-sm lg:text-base'>MY TICKETS<FaArrowRightLong /></button>
        </div>
    </div>
    </nav>
    <Outlet/>
    </>
  )
}

export default NavBar