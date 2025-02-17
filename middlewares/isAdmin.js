import jwt from 'jsonwebtoken';

export const isAdmin = async (req, res, next) => {
    try {
        let authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(400).json({
                code: 400,
                message: 'Authorization Token is Required'
            })
        }

        let token = authHeader.split(' ')[1];

        let user = jwt.verify(token, process.env.JWT_SECRET);
        if (user.role !== 'admin') {
            return res.status(401).json({
                code: 401,
                message: 'Only Admin is Authorized to Access this Route'
            })
        }

        next();
    }
    catch (error) {
        console.log('User is not Admin', error.message);
        return res.status(401).json({
            code: 401,
            message: 'Invalid or expired token'
        });
    }
}