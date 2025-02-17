import { createPollService } from "../services/poll.service.js";

export const createPoll = async (req, res) => {
    try {
        let user = await createPollService(req.user, req.body);
        res.status(201).json({
            code: 201,
            user: user,
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