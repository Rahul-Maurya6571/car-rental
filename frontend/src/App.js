import './App.css';
import Register from './components/Register/Register';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import UserSignin from './components/Signin/userSignin';
import {ToastContainer} from "react-toastify";
import AgencySignin from './components/Signin/AgencySignin';
import Header from './components/Header/Header';
import { useEffect } from 'react';
import AvailableCars from './components/user/AvailableCars';
import ViewRentedCars from './components/user/ViewRentedCars';
import BookedCars from './components/Add cars/BookedCars';
import ViewPostedCars from './components/Add cars/ViewPostedCars';
import AddMoreCars from './components/Add cars/AddMoreCar';
import LandingPage from './components/LandingPage/LandingPage';


const Routing = () =>{
  const navigate = useNavigate()
  useEffect(()=>{
    const agencyToken = localStorage.getItem("agencytoken")
    const usertoken = localStorage.getItem("usertoken")
    if(!agencyToken && !usertoken){
      return navigate("/")
    }
  },[])

  return<>
    <Header/>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/usersignin' element={<UserSignin/>} />
      <Route path='/agencysignin' element={<AgencySignin/>} />
      <Route path='/viewpostedcars' element={<ViewPostedCars/>}/>
      <Route path='/addmorecars' element={<AddMoreCars/>} />
      <Route path='/viewcar' element={<AvailableCars/>} />
      <Route path='/viewrentedcars' element={<ViewRentedCars/>} />
      <Route path='/bookedcars' element={<BookedCars/>} />
      
    </Routes>
  </>
}

function App() {
  return (
    <BrowserRouter>
      <Routing/>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;