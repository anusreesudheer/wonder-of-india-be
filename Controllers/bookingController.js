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
   try {
      const { userId } = req.query;
      const data = await Booking.find({ userId });
  
      if (data.length > 0) {
        res.json({ success: true, message: 'Successful', data });
      } else {
        res.status(404).json({ success: false, message: 'Data not found' });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ success: false, message: error.message });
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