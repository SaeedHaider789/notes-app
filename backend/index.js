import express from 'express';
import cors from 'cors'
import mongoose, { connect } from 'mongoose';
import login from './routes/login.js'
import ConnectDb from './utils/ConnectDb.js'
import signup from './routes/signup.js';
import dashboard from './routes/dashboard.js';

const port = 8000;
const app = express();

app.use(express.json())
app.use(cors())
ConnectDb()

app.use('/login', login)
app.use('/signup', signup)
app.use('/dashboard', dashboard)

app.get('/', async(req, res)=>{
    res.json({hey: "Welcome to notes-app"})
})

app.listen(port, ()=>{
    console.log(`your server running at http://localhost:${port}/`)
})
