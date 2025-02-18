import { createPollService, getPollByIdService, castVoteService, generatePollResultService } from "../services/poll.service.js";

export const createPoll = async (req, res) => {
    try {
        let poll = await createPollService(req.user, req.body);
        res.status(201).json({
            code: 201,
            poll: poll,
            message: "Poll Created Successfully"
        });
    }
    catch (error) {
        const statusCode = error.code || 500;

        res.status(statusCode).json({
            code: statusCode,
            message: error.message || 'An Unexpected Error Occurred'
        });
    }
}

export const getPollById = async (req, res) => {
    try {
        let poll = await getPollByIdService(req.user, req.params.code);
        res.status(200).json({
            code: 200,
            poll: poll,
            message: "Poll Send Successfully"
        });
    }
    catch (error) {
        const statusCode = error.code || 500;

        res.status(statusCode).json({
            code: statusCode,
            message: error.message || 'An Unexpected Error Occurred'
        });
    }
}

export const castVote = async (req, res) => {
    try {
        let poll = await castVoteService(req.user, req.params.code, req.body);
        res.status(200).json({
            code: 200,
            poll: poll,
            message: "Vote Casted Successfully"
        });
    }
    catch (error) {
        const statusCode = error.code || 500;

        res.status(statusCode).json({
            code: statusCode,
            message: error.message || 'An Unexpected Error Occurred'
        });
    }
}

export const generatePollResult = async (req, res) => {
    try {
        let pollResult = await generatePollResultService(req.user, req.params.code);
        res.status(200).json({
            code: 200,
            pollResult: pollResult,
            message: "Vote Casted Successfully"
        });
    }
    catch (error) {
        const statusCode = error.code || 500;

        res.status(statusCode).json({
            code: statusCode,
            message: error.message || 'An Unexpected Error Occurred'
        });
    }
}
