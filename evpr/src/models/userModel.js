import mongoose, { Mongoose } from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
    },
    username: {
        type: String,
        required: [true, "please provide a unique username"],
        unique: true,
    },
    eventsParticipated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
    }],
    eventsCreated: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event',
    }],
    organization: {
        type: Boolean,
        required: true,
        default: false,
    }
});

mongoose.models = {};

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;