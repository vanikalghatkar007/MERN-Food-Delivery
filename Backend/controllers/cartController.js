import { response } from "express";
import userModel from "../models/userModel.js";

const addToCart = async (req, res) =>{
    try {
        let userData = await userModel.findById({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, message: "Item added to cart successfully"})
    } catch (error) {
        console.log(error);
        response.json({success:false, message:"Cannot add item to cart"})
    }
}

const removeFromCart = async (req, res) =>{
    try {
        //we get the userId from middleware 
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;   
        }
        //update new cart data
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success: true, message:"Item removed from cart successfully!"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Item cannot be removed"})
    }
}

const getCart = async (req, res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Cannot get cart data"})
    }
}

export {addToCart, removeFromCart, getCart}