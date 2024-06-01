import express from 'express'
import { createBooking , getBookingByUserId, getAllBooking} from '../Controllers/bookingController.js';
//import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

router.post('/',  createBooking)
//router.get('/:userId', getBookingByUserId);
router.get('/:userId', getBookingByUserId);
router.get('/',  getAllBooking)
// router.post('/',getAllBookingbyUser)


export default router;