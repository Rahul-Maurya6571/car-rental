import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {toast} from "react-toastify"
import del from "../../Images/delete.png"

import "react-toastify/dist/ReactToastify.css"
function ViewPostedCars() {
    const [postedCars,setPostedCars] = useState([])

    useEffect(() => {
       
        fetch("https://rent-service-backend.onrender.com/viewpostedcars", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("agencytoken"),
                "Content-Type": "application/json"
            }
        })
        .then(res=>res.json())
        .then(result=>{
            if(result.error){
                return toast.error(result.error,{
                    position: toast.POSITION.TOP_CENTER
                })
            }
            else{
                const rentCarNewToOld = result.reverse()
                setPostedCars(rentCarNewToOld)
                console.log(result)
            }
        })


    }, [])

    const deleteItem = (id,car)=>{
        fetch("https://rent-service-backend.onrender.com/deleteagencycar",{
            method:"DELETE",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("agencytoken"),
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                _id:id
            })
        })
        .then(res=>res.json())
        .then(deletedCar=>{
            const newPostedCarArray = postedCars.filter(car=>{
                return car._id !== deletedCar._id
            })
            toast.success(`${car} removed successfully`,{
                position:toast.POSITION.TOP_CENTER
            })
            setPostedCars(newPostedCarArray)
        })
    }

    return<>
    <h4>Add More cars :<Link to="/addmorecars"><button style={{marginLeft:"10px",width:"60px",cursor:"pointer"}}>Add</button></Link></h4>
    <span style={{float:"right",marginRight:"20px"}}>
        <Link to="/bookedcars"><button>Show Booked cars</button></Link>
      </span>
    <div className="car-container">{postedCars.map((item, i) => {
        return <div key={i} className="car-data">
          <div>
            <b>Model:</b> {item.model}
            <img onClick={()=>deleteItem(item._id,item.model)}
            style={{ float: "right", height: "15px", width: "15px", cursor: "pointer" }} 
            src={del} alt="deleteicon.png" />
        </div>
          <div className="car-image">
            <img src={item.carImage} alt="car-img" />
          </div>
          <span><b>Seats:</b> {item.seatingCapacity}</span>
          <span className="car-rent"><b>Rent/day:</b> ₹{item.rentPerDay}</span>
          <div>
            <b>Car Number:</b> {item.carNumber}
        </div>
        </div>
      })}
      </div>
      </>
}
export default ViewPostedCars