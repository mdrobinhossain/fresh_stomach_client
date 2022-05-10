import React from 'react';

const ManageCustomerTable = ({detail,index,setDelete}) => {
    const updateCustomer=()=>{
        fetch("https://aqueous-springs-22311.herokuapp.com/updatecustomer",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({_id: detail._id, Accept: true})
            })
            .then(function(res){ if(res) alert("Request accepted") })
            .catch(function(res){ if(res) alert('Error while accepting') })
    }
    const deleteCustomer=()=>{
        fetch("https://aqueous-springs-22311.herokuapp.com/deletecustomer",
            {
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({_id: detail._id})
            })
            .then(function(res){ 
                if(res) alert("Deleted")
                setDelete(res);
             })
            .catch(function(res){ if(res) alert('Error while deleting') })
    }

    return (
        <>
        <tr>
            <td className="text-center">{index+1}</td>
            <td className="text-center">{detail.user_name}</td>
            <td className="text-center">{detail.user_email}</td>
            <td className="text-center flex justify-center">
                <button onClick={deleteCustomer} style={{backgroundColor:'red'}} className="px-4 py-2">Delete</button>
                {!detail.accept && <button onClick={updateCustomer} style={{width:'100px'}} className="bg-button-color ml-1">Accept</button>}
                {detail.accept && <button onClick={updateCustomer} style={{width:'100px'}} className="text-button-color px-4 py-2 ml-1">Accepted</button>}
            </td>
        </tr>
        </>
    );
};

export default ManageCustomerTable;