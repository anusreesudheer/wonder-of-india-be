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
  origin: ['https://wonder-of-india-fe.onrender.com','http://localhost:5173'],
  credential:true,
}

// database connection
const connect =async () =>{
  try{
    await mongoose.connect(process.env.URL,{
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

app.use(express.static('public'))
app.use(express.static('public'))
app.use(express.static('files'))

app.use(bodyParser.json());

app.use('/static', express.static('public'))

app.use("/api/v1/auth" ,authRoute);
app.use("/api/v1/tours" ,tourRoute);
app.use("/api/v1/users" ,userRoute);
app.use("/api/v1/booking" ,bookingRoute);

// app.use((req, res, next) => {
//   // Your rewrite rule logic goes here
//   // For example, you might want to redirect all requests from '/old-route' to '/new-route'
//   if (req.path === '/http://localhost:5173') {
//     return res.redirect(301, '/https://wonder-of-india-fe.onrender.com');
//   }
//   // If no rewrite rule matches, continue to the next middleware/route handler
//   next();
// });


app.listen(port,()=>{
  connect();
  console.log('server listening on port',port);
})