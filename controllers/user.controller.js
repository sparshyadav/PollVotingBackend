import { registerUserService, loginUserService, getAllUsersService } from "../services/user.service.js";

export const registerUser = async (req, res) => {
    try {
        let user = await registerUserService(req.body);
        res.status(201).json({
            code: 201,
            user: user,
            message: "New User Created Successfully"
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

export const loginUser = async (req, res) => {
    try {
        let token = await loginUserService(req.body);
        res.status(200).json({
            code: 200,
            token: token,
            message: 'User Logged In Successfully'
        })
    }
    catch (error) {
        const statusCode = error.code || 500;

        res.status(statusCode).json({
            code: statusCode,
            meessage: error.message || 'An Unexpected Error Occurred'
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        let users = await getAllUsersService(req.body);
        res.status(200).json({
            code: 200,
            users: users,
            message: 'All Users Sent Successfully'
        })
    }
    catch (error) {
        const statusCode = error.code || 500;

        res.status(statusCode).json({
            code: statusCode,
            meessage: error.message || 'An Unexpected Error Occurred'
        })
    }
}
