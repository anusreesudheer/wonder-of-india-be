import express from 'express'
import { createTour, updateTour, deleteTour, getSingleTour, getAllTour, } from './../Controllers/tourcontroller.js'
//import { verifyAdmin } from '../utils/verifyToken.js';
import multer from 'multer'

const router = express.Router()


//create new tour
const upload = multer({ dest: 'Jaipur/' });
router.post("/", upload.single('photo'), createTour);

//update new tour
router.put("/:id", updateTour);

//delete new tour
router.delete("/:id", deleteTour);

//get single tour
router.get("/:id", getSingleTour);

//get all tour
router.get("/", getAllTour);





export default router;