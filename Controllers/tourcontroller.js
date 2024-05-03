import Tour from '../models/Tour.js'

// create new tour
export const createTour = async(req, res) => {
    const newTour = new Tour(req.body);
    try{
        const savedTour = await newTour.save();

        res.status(200).json({success: true, message: "sucessfully created", data:savedTour,});

    }catch(err){
        res.status(500).json({success:false,message:"Failed to created. try again", });      
    }
};

//update tour
export const updateTour = async (req, res) => {

    const id =req.params.id

    try{
         const updatedTour = await Tour.findByIdAndUpdate(id, {
           $set: req.body
         },{new:true})

         res.status(200).json({success: true, message: "Sucessfully updated", data:updatedTour,});

    }catch(err){
        res.status(500).json({success:false,message:"Failed to update. try again", });
    }
};

// delete tour
export const deleteTour = async (req, res) =>{
    const id =req.params.id

    try{
         await Tour.findByIdAndDelete(id);

         res.status(200).json({success: true, message: "Sucessfully deleted",});

    }catch(err){
        res.status(500).json({success:false,message:"Failed to delete", });
    }
};

// getSingle tour
export const getSingleTour = async (req, res) =>{
    const id =req.params.id

    try{
      const tour = await Tour.findById(id);

         res.status(200).json({success: true, message: "Sucessfully", data:tour});

    }catch(err){
        res.status(404).json({success:false,message:"not found", });
    }
};

// getAll tour
export const getAllTour = async (req, res) =>{
    try{
        const userId = req.params.userId
        const tours = await Tour.find({userId:userId})

        res.status(200).json({success: true, message: "Sucessfully", data:tours});

    }catch(err){

        res.status(404).json({success:false,message:"not found", });
        
    }
};

