import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name."],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email."],
        trim: true,
    },
    message: {
        type: String,
        required: [true, "Please provide a message."],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
