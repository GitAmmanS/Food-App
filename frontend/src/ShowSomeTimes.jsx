import React from 'react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
const ShowSomeTimes = ({ children }) => {
    const [showNavBar, setShowNavBar] = useState(false);
    const location = useLocation();
    useEffect(() => {
        // console.log("This is location ",location);
        if (location.pathname === '/login' || location.pathname==='/bill/:orderId ') {
            setShowNavBar(false);
        }
        else {
            setShowNavBar(true);
        }
    }, [location])
    return (
        <div>{showNavBar && children}</div>
    )
}

export default ShowSomeTimes