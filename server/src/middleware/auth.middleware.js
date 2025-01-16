import jwt from 'jsonwebtoken';
import User from '../modules/user.module.js';

export const authenticate = async (req, res, next) => {
    try {
        const jwt_token = req.cookies.token;        

        if (!jwt_token) {
            return res.status(401).json({ message: 'Unauthorized - NO Token Provided' });
        }

        const decoded_token = jwt.verify(jwt_token, process.env.SECRET_KEY);            

        if (!decoded_token) {
            return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
        }

        const user = await User.findById(decoded_token.id);
        // const user = await User.findById(decoded_token.id).select("-password"); // most used (good practice)

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - User Not Found' });
        }

        req.user = user;
        next();

    } catch (err) {
        console.log("Error on authentication: " + err);
        res.status(500).json({ message: "Internal server error" });
    }
}
