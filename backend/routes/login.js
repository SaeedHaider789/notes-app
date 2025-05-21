import express from 'express'
import loginModel from '../Models/loginModel.js'
import cors from 'cors'

const router = express()
router.use(cors())
router.use(express.json())

router.post('/', async(req, res)=>{

    // console.log("requested")

    if(req.body?.email && req.body?.password){
        let rec = await loginModel.find({"email": req.body.email, "password": req.body.password})
        if(rec.length > 0){
            res.json({"authentication": true, "userName": rec[0].user})
        }
        else{
            res.send({"authentication": false})
        }
    }
    else{
        res.send({"authentication": false})
    }
    // if(rec.length>0){
    //     res.json({login: true})
    // }
    // else{
    //     res.send({login: true})
    // }
})

export default router