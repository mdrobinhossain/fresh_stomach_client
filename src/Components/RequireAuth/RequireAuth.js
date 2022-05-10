import React,{useContext} from 'react'
import {userContext} from  '../../App.js' 
import {
    useLocation,
    Navigate

} from 'react-router-dom';

export default function RequiredAuth({children}) {
    const [loggedInUser, setLoggedInUser] = useContext(userContext)
    let location = useLocation();
  
    if (!loggedInUser.email) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children; 
}