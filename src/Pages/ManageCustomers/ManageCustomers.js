import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import Sidebar from '../../SharedComponent/Sidebar/Sidebar';
import logo from '../../Assets/Icons/logo.png'
import ManageCustomerTable from './ManageCustomerTable/ManageCustomerTable';
import loadingIcon from './../../Assets/Icons/loading.png'


const ManageCustomers = () => {
    const [deleteStatus, setDelete] = useState({})
    const [loading, setLoading] = useState(false)
    const [customers,setCustomers] = useState([])
    useEffect(()=>{
        setLoading(true)
        fetch('https://aqueous-springs-22311.herokuapp.com/loadcustomer')
        .then(res=> res.json())
        .then(data => {
            setCustomers(data);
            setLoading(false)
        })
    },[deleteStatus])
    return (
        <div>
            <Sidebar />
            <div>
                <div className="logo w-full flex items-center justify-center bg-button-color py-3">
                    <Link to='/'><img height="50px" width="200px" src={logo} alt="logo" /></Link>
                </div>
                <div className="text-center text-2xl py-4 text-button-color">Manage Customers</div>
                <hr />
                <div className="w-full flex justify-center">
                    {!loading && <table className="w-full md:w-3/5">
                        <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {
                                customers.map((detail, index) => <ManageCustomerTable detail={detail} index={index} setDelete={setDelete} key={detail._id}/>)
                            }
                        </tbody>
                    </table>}
                    {loading && <div className='w-full flex justify-center mb-8'>
                        <img className="loading mt-4 ml-4" height='30px' width='30px' src={loadingIcon} alt="loading" />
                    </div>}
                </div>
                <hr />
            </div>
        </div>
    );
};

export default ManageCustomers;