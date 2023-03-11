// Require necessary modules and files
const router = require("express").Router();
const Event = require("../Model/Event");

// Create event
router.post("/",async (req, res) => {
    const event = new Event (req.body); // Create a new event using the request body
    try {
        const savedEvent = await event.save(); // Save the event to the database
        res.status(200).json(savedEvent); // Respond with the saved event as JSON
    } catch (err) {
        res.status(501).json(err); // Respond with an error status and message as JSON
    }
});

// Add a user to an event's list of participants
router.patch("/user",async(req,res)=>{
    try{
        const event = await Event.updateOne(
            {_id:req.body._id}, // Find the event with the matching ID
            {$push:{participants:req.body.user}} // Add the user to the participants array
        );
        res.status(200).json(event); // Respond with the updated event as JSON
    } catch(err){
        res.status(500).json(err); // Respond with an error status and message as JSON
    }
});

// Update an event
router.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id, // Find the event with the matching ID
            {$set: req.body}, // Update the event with the request body
            {new: true} // Return the updated event instead of the original event
        );
        res.status(200).json(updatedEvent); // Respond with the updated event as JSON
    } catch (err) {
        res.status(500).json(err); // Respond with an error status and message as JSON
    }
});

// Delete an event
router.delete("/:id",async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id); // Find and delete the event with the matching ID
        res.status(200).json("Event deleted..."); // Respond with a success message as JSON
    } catch (err) {
        res.status(500).json(err); // Respond with an error status and message as JSON
    }
});

// Get all events, with optional filtering by category or expert
router.get("/", async (req, res) => {
    const catName = req.query.cat; // Get the category name from the query string
    const expert = req.query.expert; // Get the expert name from the query string

    try {
        let events; // Declare a variable for the events
        if (expert) {
            events = await Event.find({ // Find events where the expert name is in the Experts array
                Experts: {
                    $in:[expert],
                },
            });
        } else if (catName) {
            events = await Event.find({ // Find events where the category name is in the category array
                category: {
                    $in: [catName],
                },
            });
        } else {
            events = await Event.find(); // Find all events
        }
        res.status(200).json(events); // Respond with the events as JSON
    } catch (err) {
        res.status(500).json(err); // Respond with an error status and message as JSON
    }
});

// Get a specific event by ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id); // Find the event with the matching ID
        res.status(200).json(event);
    } catch (err) {
        res.json(500).json(err);
    }
})




module.exports = router