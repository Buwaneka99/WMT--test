const mongoose = require('mongoose');

//import mongoose from "mongoose";

const URL = process.env.MONGO_URI

const connectDB = async () => {
    try{
        await mongoose.connect(URL);
        console.log('MongoDB connected');
    } catch(error) {
        console.log('MongoDB connection has failed', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;

//export default connectDB;

// const connectDB2 = () => {
//     mongoose.connect(URL)
//     .then(() => 
//         console.log("MongoDB connected")
//     )
//     .catch((error) => {
//         console.log("MongoDb connection error:", error.message)
//         process.exit(1)
//     });
// };


// module.exports = connectDB2;


