import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

let ConnectDb = async() =>{
    try{
        // console.log(process.env.CONNECTION_STR)
        let conn = await mongoose.connect(process.env.CONNECTION_STR)
        console.log('Db connection successful')
    }
    catch(e){
        console.log(e)
    }
    
}

export default ConnectDb