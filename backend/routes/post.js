const express = require("express");
const mongoose = require("mongoose");
const router = express.Router()
const Car = mongoose.model("Car")
const User = mongoose.model("User")
const RentedCars = mongoose.model("RentedCars")

const requireLogin = require("../middleware/requireLogin");
const requireUserLogin = require("../middleware/requireUserLogin");

router.post("/addcar",requireLogin, (req, res) => {
    // const {authorization}=req.headers
    // console.log(req.user)
    const {model,carNumber,seatingCapacity,rentPerDay,carImage}=req.body

    if(!model || !carNumber || !seatingCapacity || !rentPerDay || !carImage){
        return res.status(422).json({error:"Please fill all the fields"})
      }
    const addCar = new Car({
        model: model,
        carNumber: carNumber,
        seatingCapacity: seatingCapacity,
        rentPerDay: rentPerDay,
        carImage: carImage,
        addedBy:req.user,
        // agencyId:req.user._id
    })
    addCar.save()
    .then(result=>{
        
        // console.log(result)
        const {addedBy} = result
        res.json({message:result,addedBy})
    })
})

router.post("/addedcar",requireLogin,(req,res)=>{
    const {agencyId} = req.body
    Car.find({addedBy:agencyId})
    .then(result=>{
        // console.log(result)
        res.json(result)
    })
})


router.get("/allcars",requireLogin,(req,res)=>{
    // console.log(req.headers)
    Car.find()
    .then(cars=>{
        if(cars.length){
            res.json(cars)
        }
        else{
            res.status(422).json({error:"No cars are available for rent"})
        }
    })
})

router.post("/rentcar",requireLogin,(req,res)=>{
    const {model,days,rentedFor} = req.body
    if(!days){
        return res.status(422).json({error:"Select the number of days by clicking on dropdown"})
    }
    // console.log(req.body)
    Car.findOne({model:model})
    .then(savedCar=>{
        const bookedCar = new RentedCars({
            model:savedCar.model,
            carNumber:savedCar.carNumber,
            seatingCapacity:savedCar.seatingCapacity,
            rentPerDay:savedCar.rentPerDay,
            carImage:savedCar.carImage,
            totalPrice: savedCar.rentPerDay*parseInt(days),
            rentedFor:rentedFor,
            agencyId:savedCar.addedBy
        })
        // console.log(bookedCar)
        bookedCar.save()
        .then(result=>{
            res.json({message:`${model} rented successfully for ${days} days`})
        })
    })
})

router.post("/cartitems",requireUserLogin,(req,res)=>{
    
    const {rentedFor} = req.body
    // console.log(rentedFor)
    RentedCars.find({rentedFor:rentedFor})
    .then(rentedcars=>{
        // console.log(rentedcars)
        if(rentedcars.length==0){
           return res.status(401).json({error:"Rent a car first to see your rented car"})
        }
        else{
            // console.log(rentedcars)
            res.json(rentedcars)
        }
    })
})

router.get("/bookedcars",requireLogin,(req,res)=>{
   const {_id} =req.user
//    console.log(req.user)

//    console.log(_id)
   RentedCars.find({agencyId:_id})
   .then(bookedCarData=>{
    if(!bookedCarData){
        return res.status(422).json({error:"No Booked cars yet"})
    }
    else{
        // console.log(bookedCarData)
        return res.json(bookedCarData)
    }
   })
})

module.exports = router