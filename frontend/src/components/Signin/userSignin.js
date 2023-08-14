import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
// import "./LoginPage.css";

const UserSignin = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate()

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // console.log("Logging in with data:", formData);

        fetch("https://rent-service-backend.onrender.com/usersignin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:formData.email,
                password:formData.password
            })
        }).then(res=>res.json())
        .then(result=>{
            if(result.error){
                toast.error(result.error, {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            if(result.token){
                // console.log(result)
                toast.success(result.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                localStorage.setItem("usertoken",result.token)
                localStorage.setItem("user",JSON.stringify(result.user))
                navigate("/viewcar")
            }
        }).catch(err=>console.log(err))
    };

    return (
        <div className="login-page">
            <h1>User Signin Page</h1>
            <form onSubmit={handleFormSubmit}>
                
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit">Log In</button>
                <Link to="/register"><h6>Dont have an account ?</h6></Link>

            </form>
        </div>
    );
};

export default UserSignin;