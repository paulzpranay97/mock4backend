const express = require("express");
const app = express();
const {connection} = require("./config/db");
const { userRouter} = require("./route/user.route");
const { orderRouter} = require("./route/order.route");
const { restaurantRouter} = require("./route/res.route");


require("dotenv").config()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send({"message":"Welcome to Food Delivery App"})
})


app.use('/api',userRouter) ///user
app.use('/api',orderRouter) /// order
app.use('/api',restaurantRouter) /// resturant


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log(`Database Connected to ${process.env.PORT} `);
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Server is running at port ${process.env.PORT}`)
})