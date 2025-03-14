import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        try {
            const { verificationString } = req.body;
            console.log('Verification String:', verificationString);

            const db = getDbConnection('crm');
            const result = await db.collection('users').findOne({ verificationString });

            if (!result) {
                return res.status(401).json({ message: 'The email verification code is incorrect' });
            }

            const { _id: id, email, info } = result;

            await db.collection('users').updateOne(
                { _id: new ObjectId(id) },
                { $set: { isVerified: true } }
            );

            jwt.sign(
                { id, email, isVerified: true, info },
                process.env.JWT_SECRET,
                { expiresIn: '2d' },
                (err, token) => {
                    if (err) {
                        console.error('JWT Error:', err);
                        return res.sendStatus(500);
                    }
                    res.status(200).json({ token });
                }
            );
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'An error occurred during email verification' });
        }
    },
};
