import React from 'react';
import {Link} from "react-router-dom"
import './Dropdown.css'

const Dropdown = ({showDropDown, setShowDropDown}) => {
    return (
        <div onClick={()=>setShowDropDown(false)} className={showDropDown ? "dropdown bg-button-color flex flex-col justify-center":'hide-dropdown flex flex-col justify-center bg-button-color'}>
            <Link to="#"><p className="text-body-color pl-4 hover:pl-8 hover:font-bold py-4 smoothing">Home</p></Link>
            <Link to="#"><p className="text-body-color pl-4 hover:pl-8 hover:font-bold py-4 smoothing">Orders</p></Link>
            <Link to="/dashboard"><p className="text-body-color pl-4 hover:pl-8 hover:font-bold py-4 smoothing">Dashboard</p></Link>
            <Link to="#"><p className="text-body-color pl-4 hover:pl-8 hover:font-bold py-4 smoothing">Contact</p></Link>
            <Link to="#"><p className="text-body-color pl-4 hover:pl-8 hover:font-bold py-4 smoothing">Home</p></Link>            
        </div>
    );
};

export default Dropdown;