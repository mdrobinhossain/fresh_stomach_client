import React from 'react';

const Product = ({productDetail,setSelectedModal}) => {

    return (
        <div className="bg-white p-1">
            <img src={`https://aqueous-springs-22311.herokuapp.com/${productDetail.photoURL}`} alt="" />
            <p className="text-button-color text-xl">{productDetail.name}</p>
            <p style={{color:'lightgray'}} className="my-3">{productDetail.description}</p>
            <div className="flex justify-between items-center">
                <p className="text-body-color font-bold">$ {productDetail.price}</p>
                <button onClick={()=>setSelectedModal(productDetail._id)} className='py-2 px-4 bg-button-color'>Buy Now</button>
            </div>
        </div>
    );
};

export default Product;