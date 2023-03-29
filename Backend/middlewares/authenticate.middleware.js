require('dotenv').config()
const jwt = require('jsonwebtoken')


const authentication = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(token){
            const decoded = jwt.verify(token,process.env.jwtToken)
            if(decoded){
                req.body.userId = decoded.userId
                next()
            }else{
                res.status(400).send({msg: "Please Login First."})
            }
        }
        else{
            res.status(400).send({msg: "Please Login First."})
        }
    } catch (error) {
        res.status(400).send({msg: "Please Login First."})
    }
}

module.exports = authentication