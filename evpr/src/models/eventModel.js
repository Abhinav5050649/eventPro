import mongoose, { Mongoose } from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a name"],
    },
    description: {
        type: String,
        required: [true, "please provide a description"],
    },
    creationDate: {
        type: Date,
        required: [true, "please provide a date"],
    },
    startDate: {
        type: Date,
        required: [true, "please provide a start date"],
    },
    endDate: {
        type: Date,
        required: [true, "please provide an end date"],
    },
    location: {
        type: String,
        required: [true, "please provide a location"],
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
});

mongoose.models = {};

const Event = mongoose.models.events || mongoose.model("Event", eventSchema);
export default Event;