import React from 'react';
import search from '../../Assets/Icons/search1.png'
import './Searchbar.css'

const Searchbar = () => {
    
    return (
        <div className="py-16 flex justify-center w-full">
            <div className='w-11/12 md:w-3/4'>
                <div className="searchbar rounded w-full flex items-center bg-white" style={{height:'40px'}}>
                    <div style={{height:'30px'}} className="flex p-1 items-center justify-center bg-white p-1">
                        <img className='ml-1 bg-white' height="auto" width="35px" src={search} alt="search" />
                    </div>
                    <input className="pl-3 w-full text-body-color text-center outline-0" type='text' placeholder='Search your product' />
                    <button style={{height:'45px'}} className="bg-button-color px-8" type="submit">Search</button>
                </div>
            </div>
        </div>
    );
};

export default Searchbar;