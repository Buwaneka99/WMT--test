const Item = require('../Models/Item');
const router = require('express').Router();

// import Item from '../Models/Item';
// import { Router } from 'express';
// const router = Router();

router.get('/', async (req, res) => {
    try{
        const items = await Item.find().sort({createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try{
        const itemById = await Item.findById(
            req.params.id 
        );

        if(!itemById){
            return res.status(404).json({ message: "Item not found"});
        }

        res.status(200).json(itemById)
        
    }catch(error){
        res.status(500).json({ message: error.message })
    }
})


router.post('/', async (req, res) => {
    try{
        //const newItem = new Item(req.body);
        //const savedItem = await newItem.save();

        const item = await Item.create(req.body);
        res.status(201).json(item);
    }catch(error){
        res.status(400).json({ message: error.message });

    }
});


router.put('/:id', async (req, res) => {
    try{
        const updateItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body, 
            {
                returnDocument: 'after',
                //new: true,
                runValidators: true,
            }
        );
        
        if(!updateItem){
            return res.status(404).json({ message: "Item not found." });
        }
        res.status(200).json(updateItem);
    }catch(error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const deleteItem = await Item.findByIdAndDelete(
            req.params.id);

        if(!deleteItem){
            res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" })
    }catch(error){
        res.status(500).json({ message: error.message });
    }
})




module.exports = router;
