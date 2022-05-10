import React, { useEffect,useState } from 'react';
import Modal from '../Modal/Modal';
import Product from './Product/Product';
import loadingIcon from './../../Assets/Icons/loading.png'


const Products = () => {
    const [productDetails, setProductDetails] = useState([]);
    const [selectedModal, setSelectedModal] = useState('')
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        fetch('https://aqueous-springs-22311.herokuapp.com/loadproducts')
        .then(res => res.json())
        .then(data =>{
             setProductDetails(data)
            setLoading(false)
        })
    },[])
    return (
        <div className="flex justify-center pb-8">
            {!loading && <div className="md:w-4/5 grid grid-cols-1 md:grid-cols-3 gap-4">
                {
                    productDetails.map(productDetail => <Product productDetail={productDetail} setSelectedModal={setSelectedModal} key={productDetail._id} />)
                }
            </div>}
            {loading && <div className='w-full flex justify-center mb-8'>
                        <img className="loading mt-4 ml-4" height='30px' width='30px' src={loadingIcon} alt="loading" />
                    </div>}
            {selectedModal && <Modal productDetails={productDetails} selectedModal={selectedModal}  setSelectedModal={setSelectedModal}/>}

        </div>
    );
};

export default Products;