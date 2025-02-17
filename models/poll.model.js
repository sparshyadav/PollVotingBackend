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
    }
})

export default mongoose.model("Poll", pollSchema);
