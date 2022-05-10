import React, { useEffect, useState,useContext } from 'react';
import logo from '../../Assets/Icons/logo.png'
import menu from '../../Assets/Icons/menu.png'
import {Link } from 'react-router-dom'
import "./Navbar.css"
import Dropdown from './Dropdown/Dropdown';
import {userContext} from '../../App.js'
import avater from '../../Assets/Icons/Avatarface.png'

const Navbar = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext)
    
    const [showDropDown, setShowDropDown] = useState(false)
    const [showNav, setShowNav] = useState(true);
    useEffect(()=>{
        let scrollY = window.scrollY;
        window.addEventListener('resize', () => {
            setShowDropDown(false)
        })
        window.addEventListener('scroll',()=> {
            setShowDropDown(false)
            if(scrollY < window.scrollY){
                setShowNav(false);
            }else{
                setShowNav(true);
            }
            scrollY = window.scrollY;
        })
    },[])
    return (
        <div>
            <div className={showNav ? "fixed w-full showNav" : 'hideNav'}>
            <div className="flex justify-between items-center bg-body-color" style={{height:'60px'}}>
                <Link className="ml-8" to="/"><img height="20px" width="200px" src={logo} alt="logo" /></Link>
                <div className="mr-8 hidden md:block flex justify-center items-center">
                    <Link className="text-button-color px-3 hover:underline" to="#">Home</Link>
                    <Link className="text-button-color px-3 hover:underline" to="#">Orders</Link>
                    <Link className="text-button-color px-3 hover:underline" to="dashboard">Dashboard</Link>
                    <Link className="text-button-color px-3 hover:underline" to='#'>Blogs</Link>
                    {!loggedInUser.email && <Link className="px-4 rounded py-2 bg-button-color" to='/login'>Login</Link>}
                    {loggedInUser.email && <abbr style={{top:'10px',cursor:'pointer'}} className='relative inline-block ' title={loggedInUser.email}> 
                        <div className="flex justify-center items-center " style={{height:'30px',width:'30px', backgroundColor:'white',borderRadius:'50%'}}>
                            <img height="30px" width='30px' src={avater} alt="user" />
                        </div>
                    </abbr>}
                </div>
                <div className="md:hidden flex justify-center items-center mr-8">
                    {!loggedInUser.email && <Link className="px-4 rounded py-1 bg-button-color mr-4" to='/login'>Login</Link>}
                    {loggedInUser.email && <abbr title={loggedInUser.email}> 
                        <div className="mr-2 flex justify-center items-center " style={{height:'30px',width:'30px', backgroundColor:'white',borderRadius:'50%'}}>
                            <img height="30px" width='30px' src={avater} alt="user" />
                        </div>
                    </abbr>}
                    <div onClick={()=>{setShowDropDown(!showDropDown)}} style={{height:'30px',width:'30px',borderRadius:'50%'}} className="bg-button-color flex items-center justify-center">
                        <img height="18px" width="18px" src={menu} alt="" />
                    </div>
                </div>
            </div>
            
        </div>
        <Dropdown showDropDown={showDropDown} setShowDropDown={setShowDropDown}/>
        </div>
    );
};

export default Navbar;