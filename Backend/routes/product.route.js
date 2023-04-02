const {ProductModel} = require('../models/product.model')

const express = require('express')

const productRouter = express.Router()
productRouter.use(express.json())

productRouter.get('/', async(req,res)=>{
    try {
        const products = await ProductModel.find()
        res.status(200).send({msg:"producs", products: products})
    } catch (error) {
    }
})



productRouter.get('/:id',async(req,res)=>{
    try {
        const product = await ProductModel.findOne({_id:req.params.id})
        res.status(200).send({msg:"product", product:product})
    } catch (error) {
        res.status(400).send({error})
    }
})

productRouter.post('/add', async (req,res)=>{
    try {
        const product =  new ProductModel(req.body)
        await product.save()
        res.status(200).send({msg:"Product add successfully", product:product} )
    } catch (error) {
        res.status(400).send({msg: "something went wrong",error:error})
    }
})


productRouter.delete('/delete/:id', async(req,res)=>{
    try {
        await ProductModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).send({msg:"Product deleted successfully"})
    } catch (error) {
        res.status(400).send({msg: "something went wrong",error:error})
    }
})

productRouter.patch('/update/:id', async(req,res)=>{
    try {
        await ProductModel.findByIdAndUpdate(req.params.id,req.body)
        res.status(200).send({msg:"Product updated successfully"})
    } catch (error) {
        res.status(400).send({msg: "something went wrong",error:error})
    }
})


module.exports = {productRouter}