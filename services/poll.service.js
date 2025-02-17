import Poll from "../models/poll.model.js";
import User from "../models/user.model.js";
import crypto from 'crypto'; 

export const createPollService = async (user, body) => {
    try {
        console.log(user);

        const { question, options, expiresAt } = body;
        const uuser = await User.findById(user.userId);
        if (!uuser) {
            throw new Error("User not found");
        }

        const pollCode = crypto.randomBytes(4).toString('hex').toUpperCase(); // Example: "A1B2C3D4"

        const newPoll = await Poll.create({
            question,
            options,
            expiresAt,
            createdBy: uuser._id,
            pollCode
        });

        const populatedPoll = await newPoll.populate('createdBy', 'name phone');

        return populatedPoll;
    } catch (error) {
        console.log('Error in createPollService:', error.message);
        throw error;
    }
};
