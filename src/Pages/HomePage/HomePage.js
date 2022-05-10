import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Searchbar from '../../Components/Searchbar/Searchbar'
import Products from '../../Components/Products/Products'

export default function HomePage(){
    return(
        <div>
        <Navbar />
        <Searchbar />
        <Products />
        </div>
    )
} 