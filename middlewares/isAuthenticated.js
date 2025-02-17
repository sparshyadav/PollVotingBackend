import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    try {
        let authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(400).json({
                code: 400,
                message: 'Authorization Token is Required'
            })
        }

        let token = authHeader.split(' ')[1];

        let user=jwt.verify(token, process.env.JWT_SECRET);
        if(!user){
            return res.status(401).json({
                code: 401,
                message: 'Invalid User'
            })
        }

        req.user=user;
        next();
    }
    catch (error) {
        console.log('User is not Authenticated', error.message);
        return res.status(401).json({
            code: 401,
            message: 'Invalid or expired token'
        });
    }
}