import React from 'react';

const ManageProductTable = ({detail, index,setChange}) => {
    const { name, price} = detail;
    const deleteProduct =()=>{
        fetch("https://aqueous-springs-22311.herokuapp.com/deleteproduct",
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({name:name})
        })
        .then(function(res){
            if(res) alert("Product Deleted")
            setChange(res)
        })
        .catch(function(res){if(res) alert("Cannot  delete Product")})

    }
    return (
        <>
        <tr>
            <td className="text-center">{index+1}</td>
            <td className="text-center">{name}</td>
            <td className="text-center">{price}</td>
            <td className="text-center flex justify-center">
                <button onClick={deleteProduct} className="bg-button-color px-4 py-2">Delete</button>
            </td>
        </tr>
        </>
    );
};

export default ManageProductTable;