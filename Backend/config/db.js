import mongoose, { connect } from "mongoose";

export const connectDb = async () => {
    await mongoose.connect('mongodb+srv://vani:Vani1!@cluster0.sq32n.mongodb.net/food-delivery')
    .then(()=>console.log('DB Connected'))
}