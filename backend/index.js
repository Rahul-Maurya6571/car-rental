const dotenv = require("dotenv");
dotenv.config()
const express = require("express");
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
// const {MONGO_URI} = require("./keys")
const PORT = 8080


require("./models/user")
require("./models/agency")
require("./models/car")
require("./models/rentedCars")
app.use(express.json())//parsing the req before it get to routes
app.use(cors({
    origin:"https://rent-service-frontend.onrender.com"
}))

app.use(require('./routes/auth'))
app.use(require('./routes/post'))

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on("connected",()=>{
    console.log("Successfully connected with db")
})
mongoose.connection.on("error",()=>{
    console.log("Error while connecting with db")
})

app.listen(PORT,()=>{
    console.log(`App is listening to PORT ${PORT}`)
})