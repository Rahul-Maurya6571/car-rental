const mongoose = require('mongoose')
const agencySchema = new mongoose.Schema({
    agencyName:{
        type:String,
        required:true
    },
    agencyEmail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
mongoose.model("Agency",agencySchema)