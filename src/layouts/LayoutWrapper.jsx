import React from 'react'
import { matchPath, useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const LayoutWrapper = ({children}) => {
    const location = useLocation();
    const pathname = location?.pathname;

    const definedRoutes = [
      "/",
      "/events",
      "/events/*",
      "/tickets",
      "/about",
    ];
  
    const isKnownRoute = definedRoutes.some((route) =>
    matchPath(route, pathname) 
    );
  
  
  return (
    <div className="2xl:container w-[100%] mx-auto h-auto min-h-[100vh] relative">
      {isKnownRoute && <NavBar />}
      {children}
    </div>
  )
}

export default LayoutWrapper