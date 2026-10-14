const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const itemRoutes = require('./routes/itemRoutes')

// const connectDB = require("./db/dbConnection")


// connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log('MongoDB Connected');
//         app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//     })
//     .catch((error) => { 
//         console.log('MongoDB Connection error:', error.message);
//         process.exit(1) 
//     });


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err.message);
//     process.exit(1);
//   });


const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch(error){
        console.log("MonoDB connection error:", error.message);
        process.exit(1);
    }
};

connectDB();

app.get('/', async (req, res) =>{
    res.send("Item manger API is running");
});

app.use('/api/items', itemRoutes);
