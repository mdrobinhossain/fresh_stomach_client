import React,{useEffect,useState} from 'react';
import './Modal.css'
import loading from './../../Assets/Icons/loading.png'

const Modal = ({productDetails, selectedModal,setSelectedModal}) => {
    const [response, setResponse] = useState({})
    const [detail, setDetail] = useState({})
    const [Loading, setLoading] = useState(false)
    const [customerDetail, setCustomerDetail] = useState({})
    const [Error, setError] = useState();

    useEffect(()=>{
        if(selectedModal){
            for(let i=0; i<productDetails.length; i++){
                if(selectedModal=== productDetails[i]._id){
                    setDetail(productDetails[i]);
                }
            }
        }
    },[selectedModal,productDetails])

    const handleBlur = (e) => {
        const newCustomerDetail = {...customerDetail};
        newCustomerDetail[e.target.name] = e.target.value;
        console.log(newCustomerDetail)
        setCustomerDetail(newCustomerDetail);
    }

    const handleSubmit = (e) => {
        setLoading(true);
        customerDetail.product=detail.name;
        customerDetail.price = detail.price;
        fetch('https://aqueous-springs-22311.herokuapp.com/uploadcustomer',{
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(customerDetail)
        })
        .then(res=>res.json())
        .then(data => {
            if(data) {
                console.log(data)
                setLoading(false)
                setResponse(data)
            }
        })
        .catch(error => {
            if(error) {
                setError(error)
                setLoading(false);
            };
        })


        e.preventDefault();
    }

    
    return (
        <div>
            <div className={selectedModal ? "modal": "modal-hide"} id="mymodal">
                <div className="modal-content">
                    <span onClick={()=>setSelectedModal('')} className="close">&times;</span>
                    <p className="w-full text-button-color text-xl">{detail.name}</p>
                    <p>Price:  ${detail.price}</p>
                    <form onSubmit={handleSubmit}>
                        <input required onBlur={handleBlur} className="block w-full outline-0 border p-2 my-2 text-button-color text-center rounded focus:bg-body-color" type="text" name="user_name" placeholder="Your name" id="" />
                        <input required onBlur={handleBlur} className="block w-full outline-0 border p-2 my-2 text-button-color text-center rounded focus:bg-body-color" type="text" name="user_email" placeholder="Your email" id="" />
                        <input required onBlur={handleBlur} className="block w-full outline-0 border p-2 my-2 text-button-color text-center rounded focus:bg-body-color" type="text" name="city" placeholder="Your city" id="" />
                        <input required onBlur={handleBlur} className="block w-full outline-0 border p-2 my-2 text-button-color text-center rounded focus:bg-body-color" type="text" name="user_address" placeholder="Your address" id="" />
                        {!Loading && <input className="block w-full outline-0 p-2 my-2 text-center rounded bg-button-color" type="submit"  value="Submit" id="" />}
                        {Loading && <div className='w-full flex justify-center'>
                            <img className="loading mt-4 ml-4 " height='30px' width='30px' src={loading} alt="loading" />
                        </div>}
                        {response.insertedId && <p className="text-button-color text-center">Submitted Successfully</p>}

                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default Modal;