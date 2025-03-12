import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password });

        const db = getDbConnection('crm');
        const user = await db.collection('users').findOne({ email });

        if (!user) {
            console.log('User not found:', email);
            return res.sendStatus(401);
        }

        const { _id: id, isVerified, passwordHash, info } = user;
        console.log('User found:', { id, isVerified, info });

        const isCorrect = await bcrypt.compare(password, passwordHash);
        console.log('Password match:', isCorrect);

        if (isCorrect) {
            jwt.sign({ id, isVerified, email, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    console.log('Error signing token:', err);
                    return res.status(500).json(err);
                }

                res.status(200).json({ token });
            });
        } else {
            console.log('Incorrect password for user:', email);
            res.sendStatus(401);
        }
    },
};