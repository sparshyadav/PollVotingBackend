import Poll from "../models/Poll.model.js";
import User from "../models/user.model.js";
import Vote from "../models/vote.model.js";
import Option from "../models/option.model.js";
// import crypto from "crypto";

export const createPollService = async (user, body) => {
    try {
        const { question, options, expiresAt } = body;
        const existingUser = await User.findById(user.userId);
        if (!existingUser) {
            throw new Error("User not found");
        }

        const pollCode = Math.floor(1000 + Math.random() * 9000);

        const newPoll = await Poll.create({
            question,
            expiresAt,
            createdBy: existingUser._id,
            code: pollCode,
        });

        const optionDocs = await Option.insertMany(
            options.map((option) => ({
                value: option,
                poll: newPoll._id,
                votes: 0,
            }))
        );

        newPoll.options = optionDocs.map((option) => option._id);
        await newPoll.save();

        existingUser.polls.push(newPoll._id);
        await existingUser.save();

        const populatedPoll = await Poll.findById(newPoll._id)
            .populate("createdBy", "name phone")
            .populate("options");

        return populatedPoll;
    } catch (error) {
        console.log("Error in createPollService:", error.message);
        throw error;
    }
};


export const getPollByIdService = async (user, pollCode) => {
    try {
        if (!pollCode) {
            throw { code: 401, message: "Poll Code is Required to Fetch Poll Details" };
        }

        const poll = await Poll.findOne({ code: pollCode }).populate("options").populate("createdBy", "name phone");

        if (!poll) {
            throw { code: 404, message: "No Such Poll Found" };
        }

        if (user.userId !== poll.createdBy._id.toString()) {
            throw { code: 403, message: "You're Not Authorized to Access Someone Else's Poll" };
        }

        return poll;
    } catch (error) {
        console.log("Error in getPollByIdService:", error.message);
        throw error;
    }
};

export const castVoteService = async (user, pollCode, body) => {
    try {
        if (!pollCode) {
            throw { code: 400, message: "Poll Code is Required" };
        }

        if (!body || !body.option) {
            throw { code: 400, message: "No Option Selected" };
        }

        const poll = await Poll.findOne({ code: pollCode }).populate("options");
        if (!poll) {
            throw { code: 404, message: "No Such Poll Found" };
        }

        const existingVote = await Vote.findOne({ poll: poll._id, voter: user.userId });
        if (existingVote) {
            throw { code: 403, message: "You have already voted in this poll" };
        }

        const selectedOption = poll.options.find((opt) => opt.value === body.option);
        if (!selectedOption) {
            throw { code: 400, message: "Invalid Option Selected" };
        }

        const updatedOption = await Option.findByIdAndUpdate(
            selectedOption._id,
            { $inc: { votes: 1 } },
            { new: true }
        );

        const vote = await Vote.create({
            poll: poll._id,
            voter: user.userId,
            optionSelected: selectedOption._id,
        });

        poll.votes.push(vote._id);

        await poll.populate({
            path: 'votes',
            populate: {
                path: 'optionSelected',
                model: 'Option'
            }
        });

        const updatedPoll = await poll.save();

        return updatedPoll;
    } catch (error) {
        console.log("Error in castVoteService:", error.message);
        throw error;
    }
};

export const generatePollResultService = async (user, pollCode) => {
    try {
        if (!pollCode) {
            throw { code: 401, message: "Poll Code is Required to Fetch Poll Details" };
        }

        const poll = await Poll.findOne({ code: pollCode })
            .populate({
                path: "options",
                populate: { path: "votes", select: "name email phone" } // Assuming votes store user IDs
            })
            .populate("createdBy", "name phone");

        if (!poll) {
            throw { code: 404, message: "No Such Poll Found" };
        }

        if (user.userId !== poll.createdBy._id.toString()) {
            throw { code: 403, message: "You're Not Authorized to Access Someone Else's Poll" };
        }

        // Format the poll result
        const pollResult = {
            pollCode: poll.code,
            question: poll.question,
            createdBy: {
                name: poll.createdBy.name,
                phone: poll.createdBy.phone,
            },
            options: poll.options.map(option => ({
                optionText: option.text,
                votesCount: option.votes.length,
                voters: option.votes.map(voter => ({
                    name: voter.name,
                    email: voter.email,
                    phone: voter.phone
                }))
            }))
        };

        return pollResult;
    } catch (error) {
        console.log("Error in generatePollResultService:", error.message);
        throw error;
    }
};
