import { Schema, model } from "mongoose";

const optionSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    poll: {
        type: Schema.Types.ObjectId,
        ref: "Poll", required: true
    },
    votes: {
        type: Number,
        default: 0
    },
});

export default model("Option", optionSchema);
