import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        votes: {
            type: Number,
            default: 0
        }
    }],
    code: {
        type: Number,
        default: () => Math.floor(1000 + Math.random() * 9000)
    },
    expiresAt: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Poll", pollSchema);