import React from 'react'

export default function DashboardTable({detail, index}) {
    return (
        <>
        <tr>
            <td className="text-center">{index}</td>
            <td className="text-center">{detail.user_name}</td>
            <td className="text-center">{detail.product}</td>
            <td className="text-center">{detail.price}</td>
            
        </tr>

        </>
    );
}