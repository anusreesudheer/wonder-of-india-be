import express from 'express'
import { createBooking ,getBooking, getAllBooking,getAllBookingbyUser} from '../Controllers/bookingController.js';
//import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

router.post('/',  createBooking)
router.get('/:id',  getBooking)
router.get('/',  getAllBooking)
router.post('/',getAllBookingbyUser)


export default router;