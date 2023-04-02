const express = require('express')
const {EmpModel} = require('../models/employee.model')

const empRouter = express.Router()
empRouter.use(express.json())


empRouter.get('/',async(req,res)=>{
    try {
        const employees = await  EmpModel.find()
        res.status(200).send({msg:"employees", employees:employees})
    } catch (error) {
        res.status(400).send({msg:"something went wrong"})
    }
})


empRouter.post('/add',async(req,res)=>{
    try {
        emp = new EmpModel(req.body)
        await emp.save()
        res.status(200).send({msg:"Employee add successfully"})
    } catch (error) {
        res.status(400).send({msg:"something went wrong"})
    }
})


empRouter.patch('/update/:id',async(req,res)=>{
    try {
        await EmpModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).send({msg:"Salary updated successfully"})
    } catch (error) {
        res.status(400).send({msg:"something went wrong"})
    }
})



module.exports = {empRouter}