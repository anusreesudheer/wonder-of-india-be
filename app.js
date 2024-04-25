import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import bookingRoute from './routes/bookings.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const corsOptions ={
  origin: ['https://wonder-of-india.onrender.com','http://localhost:4000'],
  credentials: true,
}


// database connection
const connect =async () =>{
  try{
    await mongoose.connect(process.env.URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true, 
    })
    console.log('MongoDb database is connected');
  }catch(err){
    console.log('MongoDb database is not connected');
  }
}


//middleware
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json());

app.use("/api/v1/auth" ,authRoute);
app.use("/api/v1/tours" ,tourRoute);
app.use("/api/v1/users" ,userRoute);
app.use("/api/v1/booking" ,bookingRoute);


app.listen(port,()=>{
  connect();
  console.log('server listening on port',port);
})