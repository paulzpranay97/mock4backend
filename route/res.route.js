const express = require("express");
const { resModel } = require("../model/res.model")
const restaurantRouter = express.Router()
require("dotenv").config()

restaurantRouter.get("/restaurants", async (req, res) => {
    try {
        const data = await resModel.find();
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.get("/restaurants/:id", async (req, res) => {
    const ids = req.params.id
    try {
        const data = await resModel.findById(ids);
        res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.get("/restaurants/:id/menu", async (req, res) => {
    const ids = req.params.id
    try {
        const data = await resModel.findById(ids);
        res.status(200).json(data.menu)
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.post("/restaurants", async (req, res) => {
    try {
        const data = new resModel(req.body)
        await data.save()
        return res.status(201).json({ "ok": true, "mssg": "Restaurant added Successfully" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.post("/restaurants/:id/menu", async (req, res) => {
    const ids = req.params.id
    const {name,description,price,image} = req.body
    try {
     const newMenu = {
        name:name,
        price:price,
        description:description,
        image:image
     }
     let add = await resModel.findByIdAndUpdate(ids,{$push:{menu:newMenu}},{new:true})
     return res.status(200).json({ "ok": false, add })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
restaurantRouter.delete("/restaurants/:resid/menu/:menuid", async (req, res) => {
    const resID = req.params.resid
    const menuID = req.params.menuid
    try {
        const data = await resModel.findById(resID)
        if(data){
          const deleted =   await resModel.findByIdAndDelete(menuID)

        }
        return res.status(201).json({ "ok": true, "mssg": "Menu Deleted Successfully" })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})
module.exports = {
    restaurantRouter
}
