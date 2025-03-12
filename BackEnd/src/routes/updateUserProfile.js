
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';
import multer from 'multer';

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads'); // Files are saved in 'public/uploads'
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});


// Middleware for handling file uploads
const upload = multer({ storage });

// Update the route to use the upload middleware
export const updateUserProfile = {
    path: '/api/users/:userId',
    method: 'put',
    handler: [
        upload.single('profileImage'), // Handle the 'profileImage' field
        async (req, res) => {
            const { authorization } = req.headers;
            const { userId } = req.params;

            const updates = {
                name: req.body.name,
                field: req.body.field,
                profileImage: req.file ? `uploads/${req.file.filename}` : null, // Save file path
                phone: req.body.phone,
                address: req.body.address,
                skills: req.body.skills,
                bio: req.body.bio,
            };

            if (!authorization) {
                return res.status(401).json({ message: 'No authorization has been set' });
            }
            const token = authorization.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) return res.status(401).json({ message: 'Unable to verify token' });

                const { id } = decoded;

                if (id !== userId) return res.status(403).json({ message: 'Unable to update that user\'s data' });
                 console.log(req.params.userId);
                const db = getDbConnection('crm');

                // Update the user in the database
                const result = await db.collection('users').findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: updates },
                    { returnOriginal: false }
                );

                if (!result.value) {
                    return res.status(404).json({ message: 'User not found after update' });
                }

                const { email, isVerified, info } = result.value;
                jwt.sign({ id, email,isVerified, info }, process.env.JWT_SECRET, { expiresIn: '2d' }, (err, token) => {
                    if (err) {
                        return res.status(500).json(err);
                    }
                    return res.status(200).json({ token });
                });
            });
        }
    ]
};
