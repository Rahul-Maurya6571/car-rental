import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logout from "../../Images/logout.png";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function Header() {
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate()

    const handleSelectChange = (event) => {
        const agencyToken = localStorage.getItem("agencytoken")
        const userToken = localStorage.getItem("usertoken")

        if (agencyToken || userToken) {
            localStorage.removeItem("agencytoken")
            localStorage.removeItem("agency")
            localStorage.removeItem("usertoken")
            localStorage.removeItem("user")
        }



        const selectedValue = event.target.value;
        if (selectedValue !== selectedOption) {
            setSelectedOption(selectedValue);
            // console.log(selectedOption)

            navigate(selectedValue);
        }
    };

    const handleRegister = () => {
        const agencyToken = localStorage.getItem("agencytoken")
        const userToken = localStorage.getItem("usertoken")

        if (agencyToken) {
            localStorage.removeItem("agencytoken")
            localStorage.removeItem("agency")
            
        }
        if(userToken){
            localStorage.removeItem("usertoken")
            localStorage.removeItem("user")
        }

    }
    const handleLogOut = () => {
        const agencyToken = localStorage.getItem("agencytoken")
        const userToken = localStorage.getItem("usertoken")

        if(!agencyToken && !userToken){
            return toast.error("You need to log in first",{
                position: toast.POSITION.TOP_CENTER,
                type:"warning",
                autoClose:2000
            })
        }
        //it will clear the agencytoken and usertoken if it present in local storage
        if (agencyToken) {
            localStorage.removeItem("agencytoken")
            localStorage.removeItem("agency")
            return toast.success("Successfully logged out",{
                position: toast.POSITION.TOP_CENTER,
                type:"success",
                autoClose:2000
            })
        }
        if(userToken){
            localStorage.removeItem("usertoken")
            localStorage.removeItem("user")
            return toast.success("Successfully logged out",{
                position: toast.POSITION.TOP_CENTER,
                type:"success",
                autoClose:2000
            })
        }

    }

    const checkWhoLoggedin = () =>{
        const agencyToken = localStorage.getItem("agencytoken")
        const userToken = localStorage.getItem("usertoken")
        if(!agencyToken && !userToken){
            navigate("/")
        }
        if(agencyToken){
            navigate("/viewpostedcars")
        }
        if(userToken){
            navigate("/viewcar")
        }
    }

    return <><header className="header">
        <span className="logo" onClick={() => { checkWhoLoggedin() }}>Car Rental</span>
        <span className="header_links">
            <span className="signin-register">
                Signin&nbsp;
                <select value={selectedOption} style={{ width: "20px" }} onChange={handleSelectChange}>
                    <option value=""></option>
                    <option value="/agencysignin">Agency</option>
                    <option value="/usersignin">Customer</option>
                </select>

            </span>
            <span className="signin-register"><Link onClick={handleRegister} className="no_underline" to="/register">Register</Link></span>
            <span onClick={handleLogOut}>
                <Link to="/"><img className="header_links logo"
                src={logout}
                alt="logoutbutton.png" />
                </Link>
            </span>
        </span>
    </header>
        <div>
        </div>
    </>
}
export default Header