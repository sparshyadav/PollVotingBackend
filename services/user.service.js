import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUserService = async (body) => {
    try {
        let { name, phone, password } = body;

        if(!name || !phone || !password){
            const error = new Error("All fields required")
            error.code = 400
            throw error
        }

        let user = await User.findOne({ phone: phone });
        console.log("user", user)
        if (user) {
            const error = new Error('User Already Exists, Please Try Again with a Phone Number');
            error.code = 401;
            throw error;
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        let user1= await User.create({
            name, phone, password: hashedPassword
        });

        return user1;
    }
    catch (error) {
        console.log('Error in registerUserService:', error.message)
        throw error;
    }
}

export const loginUserService = async (body) => {
    try {
        const { phone, password } = body;

        const user = await User.findOne({ phone });
        if (!user) {
            const error = new Error('User Already Exists, Pleasy Try Again with a Phone');
            error.code = 401;
            throw error;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            const error = new Error('Password Does Not Match, Check it Again');
            error.code = 401;
            throw error;
        }

        const token = await jwt.sign({ userId: user._id, phone: phone }, process.env.JWT_SECRET);

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