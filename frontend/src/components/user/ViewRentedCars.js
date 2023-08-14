import { useEffect, useState } from "react";
import del from "../../Images/delete.png"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
function ViewRentedCars() {
    // const [userEmail, setUserEmail] = useState("")
    const [rentedCars, setRentedCars] = useState([])
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem("user"))
        // setUserEmail(user.email)
        // console.log(userEmail)


        fetch("https://rent-service-backend.onrender.com/cartitems", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usertoken"),
                "Content-Type": "application/json"
            },
        }).then(res => res.json())
            .then(result => {
                if (result.error) {
                    console.log(result.error)
                }
                else {
                    console.log(result)
                    const rentCarNewToOld = result.reverse()
                    setRentedCars(rentCarNewToOld)
                }
            })

    }, [])

    const deleteItem = (id) => {
        fetch("https://rent-service-backend.onrender.com/deletecar", {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("usertoken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _id: id
            })
        }).then(res => res.json())
            .then(deletedCar => {
                console.log(deletedCar)
                toast.success(`${deletedCar.model} is removed from your rented car list`, {
                    position: toast.POSITION.TOP_CENTER
                })
                const newRentedCarArray = rentedCars.filter(item => {
                    return item._id !== deletedCar._id
                })
                setRentedCars(newRentedCarArray)

            })
    }

    return (
        <>
            <div><Link to="/viewcar"><button>Rent more cars</button></Link></div>
            <div className="car-container">{rentedCars.map((item, i) => {
                return <div key={i} className="car-data">
                    <div>
                        <b>Model:</b> {item.model}
                        <img onClick={() => deleteItem(item._id)}
                            style={{ float: "right", height: "15px", width: "15px", cursor: "pointer" }}
                            src={del} alt="deleteicon.png" />
                    </div>
                    <div className="car-image">
                        <img src={item.carImage} alt="car-img" />
                    </div>
                    <span><b>Seats:</b> {item.seatingCapacity}</span>
                    <span className="car-rent"><b>Rent/day:</b> ₹{item.rentPerDay}</span>
                    <div>
                        <b>Car Number:</b>
                        {item.carNumber}
                        <span className="car-rent">
                            <b>Total Price:</b>
                            ₹{item.totalPrice}
                        </span>
                    </div>
                </div>
            })}
            </div>

        </>
    )

}
export default ViewRentedCars