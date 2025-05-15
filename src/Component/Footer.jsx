import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    let currentDate = new Date();
let currentYear = currentDate.getFullYear();
    return (
        <div className="bg-grey-darker text-white p-2">
            <div className="flex flex-1 mx-auto justify-center items-center">&copy; My Design {currentYear} Disploy . All Rights Reserved by <Link to="https://disploy-react.vercel.app/" target=" _blank">Disploy</Link></div>
        </div>
    )
}

export default Footer
