const mongoose = require('mongoose')

const empSchema = mongoose.Schema({
    name : String,
    image : String,
    department:String,
    salary :Number
})


const EmpModel = mongoose.model('employee', empSchema)

module.exports = {EmpModel}
