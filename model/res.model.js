const mongoose = require("mongoose");
const resSchema = mongoose.Schema({
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
      name: String,
      description: String,
      price: Number,
      image: String
    }]
})
const resModel = mongoose.model("restaurant",resSchema)
module.exports={
    resModel
}