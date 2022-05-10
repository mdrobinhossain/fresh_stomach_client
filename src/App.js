import {createContext,useState} from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import HomePage from './Pages/HomePage/HomePage'
import Dashboard from './Pages/Dashboard/Dashboard'
import AddProduct from './Pages/AddProduct/AddProduct';
import LoginPage from './Pages/LoginPage/LoginPage';
import SignUp from './Pages/LoginPage/SignUp';
import RequireAuth from './Components/RequireAuth/RequireAuth'
import ManageProducts from './Pages/ManageProducts/ManageProducts'
import ManageCustomers from './Pages/ManageCustomers/ManageCustomers'

export const userContext = createContext({})


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
    <div className="App-header">
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }/>
        <Route path="/dashboard/addproduct" element={
          <RequireAuth>
            <AddProduct />
          </RequireAuth>
        }/>
        <Route path="/dashboard/manageproducts" element={
          <RequireAuth>
            <ManageProducts />
          </RequireAuth>
         }/>
        <Route path="/dashboard/managecustomers" element={
          <RequireAuth>
            <ManageCustomers />
          </RequireAuth>
         }/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignUp />}/>
      </Routes>
    </div>
    </userContext.Provider>
  );
}

export default App;
