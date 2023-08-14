const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const carSchema = new mongoose.Schema({
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
    addedBy:{
        type:ObjectId,
        ref:"Agency"
    }
})
mongoose.model("Car",carSchema)