import React, { useEffect,useContext,useState } from 'react'
import Sidebar from '../../SharedComponent/Sidebar/Sidebar'
import {Link} from "react-router-dom"
import logo from './../../Assets/Icons/logo.png'
import {userContext} from '../../App.js'
import DashboardTable from './DashboardTable/DashboardTable'
import loadingIcon from './../../Assets/Icons/loading.png'



export default function Dashboard(){
    
    const [loading,setLoading] = useState(false);
    const [totalSell, setTotalSell] = useState(0);
    const [customerDetails, setCustomerDetails] = useState([])
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    
    useEffect(()=>{
        setLoading(true);
        fetch('https://aqueous-springs-22311.herokuapp.com/loadcustomerwithcondition',
        {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(loggedInUser)
        })
        .then(res=> res.json())
        .then(data=> {
            setCustomerDetails(data)
            setLoading(false)
        })
        if(loggedInUser!=='johnydeb@gmail.com'){
            alert('use this email and password to use this site admin: email:johnydeb@gmail.com || password:johnydeb');
        }
        
    },[loggedInUser])

    useEffect(()=>{
        let total = 0;
        for(let i=0; i<customerDetails.length; i++){
            
            let sell = parseInt(customerDetails[i].price)
            console.log(sell)
            total = total + sell;
        }
        setTotalSell(total)
    },[customerDetails])
    return (
        <div>
            <Sidebar />
            <div>
                <div className="logo w-full flex items-center justify-center bg-button-color py-3">
                    <Link to='/'><img height="50px" width="200px" src={logo} alt="" /></Link>
                </div>
                <div className="text-center text-2xl py-4 text-button-color">Dashboard</div>
                <hr />
                <div className="w-full flex justify-center">
                    {!loading && <table className="w-full md:w-3/5">
                        <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>Product</th>
                            <th>Price</th>
                        </tr>
                        </thead>
                        
                        
                        <tbody>
                            {
                                customerDetails.map((detail, index) => <DashboardTable detail={detail} index={index+1} key={detail._id} />)
                            }
                        </tbody>
                    </table>}
                    {loading && <div className='w-full flex justify-center mb-8'>
                        <img className="loading mt-4 ml-4" height='30px' width='30px' src={loadingIcon} alt="loading" />
                    </div>}
                    
                </div>
                <hr />
                <div>
                    <h1 className='pl-4'>Total : $ {totalSell}</h1>
                </div>
            </div>
        </div>
    );
}