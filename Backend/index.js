const express = require('express')
const cors = require('cors')
const {userRouter} = require('./routes/user.route')
const {productRouter} = require('./routes/product.route')
const {empRouter} = require('./routes/employee.route')
const {connection} = require('./db')
const authentication = require('./middlewares/authenticate.middleware')
require('dotenv').config()


const app = express()
app.use(express.json())
app.use(cors())


app.use('/users', userRouter)

app.use('/products',productRouter)
// app.use('/posts',authentication, postRouter)

app.use('/employees', empRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection 
        console.log('Connected to Data-Base')
    } catch (error) {
        console.log(error)
    }
    console.log('Server is running')
})