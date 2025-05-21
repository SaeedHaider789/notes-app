import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import notesModel from '../Models/notes.js'

const dashboard = express()

dashboard.use(cors())
dashboard.use(express.json())

dashboard.get('/:userName', async(req, res)=>{
    // saving note for a furter testing
    // const note = new notesModel({user: 'saeed', title: "Meeting on 7th April", date: "27th Aprill 2024", content: 'Meeting on 7th April Meeting on 7th April', isPinned: true})
    // note.save()
    // console.log(req.params.userName)

    let result = await notesModel.find({"user": req.params.userName})
    // console.log(result)
    
    res.send(result)
})

dashboard.delete('/delete', async(req, res)=>{
    let result = await notesModel.deleteOne({_id: req.body.id})
    res.send('done')
})

dashboard.put('/pin', async(req, res)=>{
    // console.log('he')
    let result = await notesModel.updateOne({_id: req.body.id}, {$set: {isPinned: (req.body.isPinned ? false : true)}})
    res.send('done')
    // console.log('id: '+ req.body.id+ '   isPinned: '+ req.body.isPinned)
    // res.send('id: '+ req.body.id+ '   isPinned: '+ req.body.isPinned)
})

dashboard.post('/add', async(req, res)=>{ // it will handle the adding of elements
    // console.log(req.body)
    // res.send(req.body)
    // let result = await notesModel.insertOne(req.body)
    // console.log(req.body)
    let response = await notesModel.insertOne(req.body)
    res.send("done")
})

dashboard.put('/edit', async(req, res)=>{
    let result = await notesModel.updateOne({_id: req.body.id}, {$set: {title: req.body.title, content: req.body.content}})
    res.send(result)
})
export default dashboard