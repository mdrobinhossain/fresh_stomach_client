import React,{useState,useContext} from 'react';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase.config';
import { getAuth,createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import googleIcon from './../../Assets/Icons/googleIconcrop.jpg'
import loadingIcon from './../../Assets/Icons/loading.png'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import './LoginPage.css'
import {userContext} from '../../App.js' 



const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const SignUp = () => {
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";


    const [loggedInUser, setLoggedInUser ] = useContext(userContext);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({})
    const [success, setSuccess] = useState(false)
    const [userObject, setUserObject] = useState({})
    const handleBlur = (e) => {
        let newUserObject = {...userObject};
         newUserObject[e.target.name] = e.target.value;
        setUserObject(newUserObject);
    }
    // Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () =>{
        signInWithPopup(auth, googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            
            const user = result.user;
            setLoggedInUser({email:user.email})
            navigate(from, { replace: true });

            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }
//CREATING USER WITH EMAIL AND PASSWORD.
    const handleSubmit = (e) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, userObject.email, userObject.password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setSuccess(true)
            setLoading(false);
            setLoggedInUser({email:user.email})
            navigate(from, { replace: true });

            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError({code:errorCode,message:errorMessage})
            setLoading(false)
        });
        e.preventDefault();
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="border p-2 w-11/12 md:w-1/2">
                <h1 className="text-xl">Sign up</h1>
                <hr />
                <form onSubmit={handleSubmit}  className="w-full">
                    <input onBlur={handleBlur} type="email" className="w-full p-1 my-2 text-center text-button-color" name='email' placeholder="email" />
                    <input onBlur={handleBlur} type="password" className="w-full p-1 my-2 text-center text-button-color" name='password' placeholder="password" />
                    {!loading && <input type="submit" className="w-full p-1 my-2 bg-button-color" value='Submit' />}
                    <div className='w-full flex justify-center'>
                        {loading && <img className="loading mt-4 ml-4" height='30px' width='30px' src={loadingIcon} alt="loading" />}
                    </div>
                    <Link to ='/'><p className="text-button-color mb-8">Forgot password ?</p></Link>
                    
                </form>
                <hr />
                <button onClick={handleGoogleSignIn} className="w-full my-2 px-1 flex items-center google-btn">
                    <img height="35px" width="35px" src={googleIcon} alt="google" />
                    <p className="text-center w-full">Continue with Google</p>
                </button>
                <div className="flex justify-between">
                    <p>Already have an account?</p>
                    <Link className="text-button-color" to='/login'>Login</Link>
                </div>
                {error.message && <p style={{color:'red'}}>{error.message} <br /> Error Code: {error.code}</p>}
                {success && <p className="w-full text-center text-button-color">Sign Up Successful. Don't lose password</p>}
            </div>
        </div>
    );
};

export default SignUp;