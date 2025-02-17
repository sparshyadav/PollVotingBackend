import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUserService = async (body) => {
    try {
        let { name, email, phone, password, role } = body;

        let user = await User.findOne({ email });
        if (user) {
            const error = new Error('User Already Exists, Please Try Again with a New Email');
            error.code = 401;
            throw error;
        }

        user = await User.findOne({ phone });
        if (user) {
            const error = new Error('User Already Exists, Pleasy Try Again with a New Phone Number');
            error.code = 401;
            throw error;
        }

        if (role === "admin") {
            user = await User.findOne({ role });
            if (user) {
                const error = new Error('User Admin Already Exists, Pleasy Try Again with Owner Role');
                error.code = 401;
                throw error;
            }
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name, email, phone, password: hashedPassword, role
        });

        return user;
    }
    catch (error) {
        console.log('Error in registerUserService:', error.message)
        throw error;
    }
}

export const loginUserService = async (body) => {
    try {
        const { email, password } = body;

        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User Already Exists, Pleasy Try Again with a New Email');
            error.code = 401;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            const error = new Error('Password Does Not Match, Check it Again');
            error.code = 401;
            throw error;
        }

        const token = await jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET);

        return token;
    }
    catch (error) {
        console.log('Error in loginUserService:', error.message)
        throw error;
    }
}

export const getAllUsersService = async () => {
    try {
        let users = await User.find();
        if (!users) {
            const error = new Error('No Users Found');
            error.code = 404;
            throw error;
        }

        return users;
    }
    catch (error) {
        console.log('Error in getAllUsersService:', error.message)
        throw error;
    }
}