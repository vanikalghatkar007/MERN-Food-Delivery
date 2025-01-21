import mongoose, { connect } from "mongoose";

export const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log('DB Connected'))
}