import React,{useState,useContext} from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css'
import grid from "../../Assets/Icons/grid1.png"
import {userContext} from '../../App'


export default function Sidebar(){
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    const [showSidebar, setShowSidebar] = useState(true)
    return(
        <div className='sidebar-parent'>
            <div className={showSidebar ? "sidebar flex items-center":"hide-sidebar flex items-center"}>
                <div onClick={()=>setShowSidebar(!showSidebar)} className="bg-button-color menu-half-circle flex justify-center items-center">
                    <div className="bg-body-color menu-circle flex justify-center items-center">
                        <img height="20px" width="20px" src={grid} alt="menu" />
                    </div>
                </div>
                <div className=" shadow-lg h-screen bg-button-color flex flex-col justify-center" style={{width:'250px'}}>
                    <Link to="/dashboard"><p className="text-body-color hover:font-bold my-4 pl-4 py-2 hover:pl-8 smoothing">Dashboard</p></Link>
                    {loggedInUser.email==='johnydeb@gmail.com' && <Link to="/dashboard/managecustomers"><p className="text-body-color hover:font-bold my-4 pl-4 py-2 hover:pl-8 smoothing">Manage Customers</p></Link>}
                    {loggedInUser.email==='johnydeb@gmail.com' && <Link to="/dashboard/addproduct"><p className="text-body-color hover:font-bold my-4 pl-4 py-2 hover:pl-8 smoothing">Add Product</p></Link>}
                    {loggedInUser.email==='johnydeb@gmail.com' && <Link to="/dashboard/manageproducts"><p className="text-body-color hover:font-bold my-4 py-2 pl-4 hover:pl-8 smoothing">Manage Products</p></Link>}
                    <button onClick={()=>setLoggedInUser({})} className='hover:underline'>Log out</button>
                </div>

            </div>
        </div>
    );
}