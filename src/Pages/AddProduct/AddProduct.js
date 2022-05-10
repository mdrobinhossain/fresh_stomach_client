import React, { useState } from 'react';
import Sidebar from '../../SharedComponent/Sidebar/Sidebar';
import logo from './../../Assets/Icons/logo.png'
import upload from './../../Assets/Icons/upload.png'
import {Link} from 'react-router-dom'
import './AddProduct.css'
import loading from './../../Assets/Icons/loading.png';

const AddProduct = () => {
    const [Loading, setLoading] =useState(false)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [file, setFile] = useState({})
    const [textData, setTextData] = useState({});
    const handleBlur = (e) => {
        let newTextData = {...textData};
        newTextData[e.target.name] = e.target.value;
        setTextData(newTextData);
    }
    const handleChange = (e) => {
        console.log(e.target.files[0])
        const file = e.target.files[0];
        setFile(file);


    }
    const handleSubmit = (e) => {
        setLoading(true);
        let formData = new FormData();
        formData.append('name',textData.name);
        formData.append('price',textData.price);
        formData.append('description',textData.description)
        formData.append('file',file)
        fetch('https://aqueous-springs-22311.herokuapp.com/addproduct',{
            method:'POST',
            body:formData,
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data=> {
            if(data){
                setSuccess(true);
                setLoading(false);
            } 
        })
        .catch(error =>{
            if(error){
                setError(true);
                setLoading(false);
            }
        } )
        e.preventDefault();
    }
    return (
        <div>
            <Sidebar />
            <div>
                <div className="logo w-full flex items-center justify-center bg-button-color py-3">
                    <Link to='/'><img height="50px" width="200px" src={logo} alt="" /></Link>
                </div>
                <div className="text-center text-2xl py-4 text-button-color">Add a Product</div>
                <div className="w-full flex justify-center">
                    <form onSubmit={handleSubmit} className="w-full md:w-3/5" >
                        <div className="input-container w-full">
                            <input onBlur={handleBlur} required  className="block text-button-color outline-0 text-center my-4 p-2 rounded-lg w-full" type="text" placeholder="Product Name" name="name" />
                            <input onBlur={handleBlur} required  className="block text-button-color outline-0 text-center my-4 p-2 rounded-lg w-full" type="text" placeholder="Product Price" name="price" />
                            <textarea onBlur={handleBlur} required  className="block text-button-color outline-0 text-center my-4 p-2 rounded-lg w-full" type="text" placeholder="Product description" name="description" />
                            <input onChange={handleChange} required  id='file' className=" hidden block text-button-color outline-0 text-center my-4 p-2 rounded-lg w-full" type="file" name="file" />
                            <label style={{width:'150px',height:'40px'}} className="rounded bg-button-color p-4 text-body-color flex justify-between items-center" htmlFor="file"><img width="30px" height="30px" src={upload} alt=""/><p>Upload file</p></label>
                        </div>
                        
                        {Loading && <img className="loading mt-4 ml-4" height='30px' width='30px' src={loading} alt="loading" />}
                        
                        {!Loading && <input  className="rounded block ml-2 my-4 px-4 py-2 bg-button-color" type="submit" value='Save' />}
                    </form>
                </div>
                {success && <div className="text-center text-2xl text-button-color">Product added Successfully !</div>}
                {error && <div className="text-center text-2xl text-danger-color">Cannot Upload info. Please try again ...</div>}

            </div>
        </div>
    );
};

export default AddProduct;