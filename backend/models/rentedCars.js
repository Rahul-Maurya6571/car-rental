const mongoose = require('mongoose')
const rentedCarSchema = new mongoose.Schema({
    model:{
        type:String,
        required:true
    },
    carNumber:{
        type:String,
        required:true
    },
    seatingCapacity:{
        type:Number,
        required:true
    },
    rentPerDay:{
        type:Number,
        required:true
    },
    carImage:{
        type:String,
        required:true
    },
    totalPrice:{
        type:Number
    },
    rentedFor:{
        type:String
    },
    agencyId:{
        type:String
    }

})
mongoose.model("RentedCars",rentedCarSchema)