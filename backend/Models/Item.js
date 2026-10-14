const mongoose = require("mongoose");

//const {model, Schema} = require("mongoose");

//import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        itemName: 
        {
            type: String,
            required: true,
            trim: true
        },

        description:
        {
            type: String,
            default: ''
        },

        price:
        {
            type: Number, 
            required: true,
            min: 0
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Item', itemSchema);

//export default model('Item', itemSchema);