import Poll from "../models/Poll.model.js";
import User from "../models/user.model.js";
import crypto from 'crypto'; 

export const createPollService = async (user, body) => {
    try {
        const { question, options, expiresAt } = body;
        const uuser = await User.findById(user.userId);
        if (!uuser) {
            throw new Error("User not found");
        }

        const pollCode = crypto.randomBytes(4).toString('hex').toUpperCase(); 

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

export const getPollByIdService = async (user, pollCode) => {
    try {
        if(!pollCode){
            throw {
                code: 401,
                message: "Poll Code is Required to Fetch Poll Details"
            }
        }

        const poll=await Poll.findOne({code: pollCode});
        if(!poll){
            throw {
                code: 404,
                message: "No Such Poll Found"
            }
        }

        if(user.userId !== poll.createdBy.toString()){
            throw {
                code: 403,
                message: "You're Not Authorized to Access Someone Else's Poll"
            }
        }

        return poll;
    } catch (error) {
        console.log('Error in createPollService:', error.message);
        throw error;
    }
};

