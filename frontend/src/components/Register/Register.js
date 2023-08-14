import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    const [userType, setUserType] = useState("");
    const [userData,setUserdata] = useState({
        name:"",
        email:"",
        password:""
    })
    const [agencyData,setAgencydata] = useState({
        agencyName:"",
        agencyEmail:"",
        password:""
    })
    const navigate = useNavigate()

    const submitHandler=(e,type,data)=>{
        e.preventDefault()
        // console.log(data)
        // console.log(type)
        if(type ==="user"){
            fetch("https://rent-service-backend.onrender.com/registeruser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:data.name,
                    email:data.email,
                    password:data.password
                })
            }).then(res=>res.json())
            .then(result=>{
                if(result.error){
                    toast.error(result.error, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    
                }
                if(result.message){
                    // console.log(result.message)
                    toast.success(result.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    navigate("/usersignin")
                }
            })
        }
        if(type ==="agency"){
            fetch("https://rent-service-backend.onrender.com/registeragency",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    agencyName:data.agencyName,
                    agencyEmail:data.agencyEmail,
                    password:data.password
                })
            }).then(res=>res.json())
            .then(result=>{
                if(result.error){
                    toast.error(result.error, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    
                }
                if(result.message){
                    // console.log(result.message)
                    toast.success(result.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    navigate("/agencysignin")
                }
            })
        }
    }

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
    };

    const renderForm = () => {
        if (userType === "customer") {
            return (
                <form onSubmit={e=>submitHandler(e,"user",userData)}>
                    <h2>Customer Registration Form</h2>
                    <label>Name:</label>
                    <input type="text" name="firstName" onChange={(e)=>{
                        setUserdata(prevData=>{
                            return {...prevData,name:e.target.value}
                        })
                    }} 
                    value={userData.name}
                    required/>


                    <label>Email:</label>
                    <input type="email" name="email" onChange={(e)=>{
                        setUserdata(prevData=>{
                            return {...prevData,email:e.target.value}
                        })
                    }} 
                    value={userData.email}
                    required/>

                    <label>Password: </label>
                    <input type="password" name="password" onChange={(e)=>{
                        setUserdata(prevData=>{
                            return {...prevData,password:e.target.value}
                        })
                    }} 
                    value={userData.password}
                    required/>

                    <button type="submit">Register</button>
                    <Link to="/usersignin"><h6>Already registered ?</h6></Link>
                </form>
            );
        } else if (userType === "agency") {
            return (
                <form onSubmit={e=>submitHandler(e,"agency",agencyData)}>
                    <h2>Car Rental Agency Registration Form</h2>
                    <label>Agency Name:</label>
                    <input type="text" name="agencyName" onChange={e=>{
                        setAgencydata(prevData=>{
                            return {...prevData,agencyName:e.target.value}
                        })
                    }}
                    value={agencyData.agencyName} />

                    <label>Email:</label>
                    <input type="email" name="email" onChange={e=>{
                        setAgencydata(prevData=>{
                            return {...prevData,agencyEmail:e.target.value}
                        })
                    }}
                    value={agencyData.agencyEmail}/>

                    <label>Password:</label>
                    <input type="password" name="password" onChange={e=>{
                        setAgencydata(prevData=>{
                            return {...prevData,password:e.target.value}
                        })
                    }}
                    value={agencyData.password}/>

                    <button type="submit">Register</button>
                    <Link to="/agencysignin"><h6>Already registered ?</h6></Link>

                </form>
            );
        }
    };

    return (
        <div className="registration-page">
            <h1>Registration Page</h1>
            <label>Select user type:</label>
            <select value={userType} onChange={handleUserTypeChange}>
                <option value="">--Select--</option>
                <option value="customer">Customer</option>
                <option value="agency">Car Rental Agency</option>
            </select>

            {renderForm()}

        </div>
    );
};

export default Register;
