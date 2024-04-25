import Booking from './../models/booking.js'


// create new booking
export const createBooking = async(req,res) => {
   const newBooking = new Booking(req.body)
   console.log('haiiii');
   try {
      console.log('hai');
      const savedBooking = await newBooking.save()

      res.status(200).json({success:true, message:"Your tour is booked!", data:savedBooking})
   } catch (error) {
      res.status(500).json({success:true, message:"Internal server error!"})
   }
}

// get single booking
export const getBooking = async(req,res) => {
   const id = req.params.id
   
   try {
      const book = await Booking.findById(id)

      res.status(200).json({success:true, message:"Successful!", data:book})
   } catch (error) {
      res.status(404).json({success:true, message:"Not Found!"})
   }
} 


// get all booking
export const getAllBooking = async(req,res) => {
   
   try {
      const books = await Booking.find({})

      res.status(200).json({success:true, message:"Successful", data:books})
   } catch (error) {
      res.status(500).json({success:false, message:"Internal server error!"})
   }
} 

// get all booking by user
export const getAllBookingbyUser = async(req,res) => {

   try {
      const userId = req.params.userId
      const bookings = await Booking.find({userId: userId})
      res.json(bookings)
      
   } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      
   }
}