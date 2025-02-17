import { Schema, model } from "mongoose";

const VoteSchema = new Schema({
    poll: { type: Schema.Types.ObjectId, ref: "Poll", required: true },
    voter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    optionSelected: { type: String }
});

export default model("Vote", VoteSchema);
