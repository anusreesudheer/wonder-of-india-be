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


// Get bookings by userId
export const getBookingByUserId = async (req, res) => {
   const { userId } = req.query;
  
   try {
     const bookings = await Booking.find({ userId });
     res.json({success:true, message:"Successful", data:bookings});
   } catch (error) {
     res.status(500).json({ error: 'Failed to fetch bookings' });
   }
 };


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
// export const getAllBookingbyUser = async(req,res) => {

//    try {
//       const userId = req.params.userId
//       const bookings = await Booking.find({userId: userId})
//       res.json(bookings)
      
//    } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
      
//    }
// }