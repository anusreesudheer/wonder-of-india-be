import Tour from '../models/Tour.js';

// create new tour
export const createTour = async (req, res) => {
    const newTourData = { ...req.body };
    if (req.file) {
        newTourData.photo = req.file.path; // Save the file path
    }
    const newTour = new Tour(newTourData);

    try {
        const savedTour = await newTour.save();
        res.status(200).json({ success: true, message: "Successfully created", data: savedTour });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create. Try again." });
    }
};

// update tour
export const updateTour = async (req, res) => {
    const id = req.params.id;
    const updatedTourData = { ...req.body };
    if (req.file) {
        updatedTourData.photo = req.file.path; // Save the new file path
    }

    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: updatedTourData
        }, { new: true });

        res.status(200).json({ success: true, message: "Successfully updated", data: updatedTour });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to update. Try again." });
    }
};

// delete tour
export const deleteTour = async (req, res) => {
    const id = req.params.id;

    try {
        await Tour.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

// getSingle tour
export const getSingleTour = async (req, res) => {
    const id = req.params.id;

    try {
        const tour = await Tour.findById(id);
        res.status(200).json({ success: true, message: "Successfully retrieved", data: tour });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};

// getAll tours
export const getAllTour = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tours = await Tour.find({ userId: userId });
        res.status(200).json({ success: true, message: "Successfully retrieved", data: tours });
    } catch (err) {
        res.status(404).json({ success: false, message: "Not found" });
    }
};
