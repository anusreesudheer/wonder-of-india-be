import express from 'express'
import { createTour, updateTour, deleteTour, getSingleTour, getAllTour,getFeaturedTour } from './../Controllers/tourcontroller.js'
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router()

//create new tour
router.post("/", verifyAdmin, createTour);

//update new tour
router.put("/:id", verifyAdmin, updateTour);

//delete new tour
router.delete("/:id",verifyAdmin, deleteTour);

//get single tour
router.get("/:id", getSingleTour);

//get all tour
router.get("/", getAllTour);

router.get("/search/getFeaturedTour", getFeaturedTour)



export default router;