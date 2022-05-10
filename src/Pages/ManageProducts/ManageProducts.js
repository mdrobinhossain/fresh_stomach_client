import React,{ useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import logo from '../../Assets/Icons/logo.png'
import Sidebar from '../../SharedComponent/Sidebar/Sidebar';
import ManageProductTable from './ManageProductTable/ManageProductTable';
import loadingIcon from './../../Assets/Icons/loading.png'


const ManageProducts = () => {
    const [change,setChange] = useState({})
    const [loading,setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState([])
    useEffect(()=>{
        setLoading(true)
        fetch('https://aqueous-springs-22311.herokuapp.com/loadproducts')
        .then(res => res.json())
        .then(data => {
            setProductDetails(data)
            setLoading(false)
        })
    },[change])
    return (
        <div>
            <Sidebar />
            <div>
                <div className="logo w-full flex items-center justify-center bg-button-color py-3">
                    <Link to='/'><img height="50px" width="200px" src={logo} alt="" /></Link>
                </div>
                <div className="text-center text-2xl py-4 text-button-color">Manage Product</div>
                <hr />
                <div className="w-full flex justify-center">
                    {!loading && <table className="w-full md:w-3/5">
                        <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {
                                productDetails.map((detail, index) => <ManageProductTable detail={detail} index={index} setChange={setChange} key={detail._id}/>)
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

export default ManageProducts;