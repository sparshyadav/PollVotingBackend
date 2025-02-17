import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option"
    }],
    code: {
        type: Number,
        default: () => Math.floor(1000 + Math.random() * 9000)
    },
    expiresAt: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }]
})

export default mongoose.model("Poll", pollSchema);
