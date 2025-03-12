

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import{v4 as uuid} from 'uuid';
import { getDbConnection } from '../db';
import { sendEmail } from './emailRoute'; // Import sendEmail function

export const signUpRoute = {
    path: '/api/signup',
    method: 'post',
    handler: async (req, res) => {
        const { name, email, password } = req.body;
        try {
            const db = getDbConnection('crm');
            const user = await db.collection('users').findOne({ email });

            if (user) {
                return res.sendStatus(409); // Conflict: User already exists
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const verificationString = uuid();

            const startingInfo = {
                field: '',
                profileImage: '',
                phone: '',
                address: '',
                skills: '',
                bio: '',
            };

            const result = await db.collection('users').insertOne({
                name,
                email,
                passwordHash,
                info: startingInfo,
                isVerified: false,
                verificationString,
            });

            const { insertedId } = result;
            jwt.sign({
                id: insertedId,
                name,
                email,
                info: startingInfo,
                isVerified: false,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2d',
            },
            async (err, token) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                // Send welcome email after successful signup
                const subject = 'Welcome to Our Service';
                const message = `Hi ${name}, welcome! Your account has been created successfully:
                <b>Please Click on the link to verify your account</b>
                http://localhost:5173/verify-email/${verificationString}.`;

                try {
                    await sendEmail(email, subject, message);
                    res.status(200).json({ token });
                } catch (error) {
                    console.error("Error sending welcome email:", error);
                    res.status(500).json({ error: 'Signup successful, but failed to send email.' });
                }
            });
        } catch (error) {
            console.error("Signup error:", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
};
