import express from 'express'
import cors from 'cors'
import loginModel from '../Models/loginModel.js'
import { sendMail } from '../utils/nodeMailer.js'

const page = express()
page.use(cors())
page.use(express.json())

page.get('/', (req, res)=>{
    res.json({'autentication': false})
})

// verifyEmail is registered before or not //api
page.get('/check/:email/:user', async(req, res)=>{
    // console.log(req.params.email, req.params.user)
    let registered = {}
    let records = await loginModel.find({user: req.params.user.toLowerCase()})
    // console.log(records)

    if(records.length > 0){
        registered.userRegistered = true
        registered.emailRegistered = true
    }
    else{
        registered.userRegistered = false
        records = await loginModel.find({email: req.params.email})
        if(records.length > 0){
            registered.emailRegistered = true
        }
        else{
            registered.emailRegistered = false
        }
    }
    // console.log(registered.emailRegistered)
    res.json({'emailRegistered': registered.emailRegistered, 'userRegistered': registered.userRegistered}) // it means it is registered
})

// will save the signup data
page.post('/save', async(req, res)=>{ // will save all the data
    // console.log("hello world")
    let saved = await loginModel.insertOne({'user': req.body.user, 'email': req.body.email, password: req.body.password})
    // console.log(saved)
    res.json({'saved': true})
})

page.get('/otp/:email', async(req, res)=>{
    let otp = ''
    for(let i = 0; i<6; i++){otp += Math.floor(Math.random()*10)} // generating OTP

    let sendingOtpToEmail = (email, otp) =>{
        // console.log(email)
        sendMail(email, 'OTP verification', `Your verification code is ${otp}. Please enter this code to complete your sign-up on Notes-app. Do not share this code with anyone.`)
    }
    // console.log(req.params.email)

    sendingOtpToEmail(req.params.email, otp)

    res.send(otp)
})

export default page