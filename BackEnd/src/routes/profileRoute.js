

import { getDbConnection } from '../db';
import { ObjectId } from 'mongodb'; // Correct import

export const profileRoute = {
    path: '/api/profile/:userId',
    method: 'get',
    handler: async (req, res) => {
        const { userId } = req.params;
        const db = getDbConnection('crm');

        // Validate userId
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        try {
            const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error('Server error:', error);
            res.status(500).json({ message: 'Server error', error });
        }
    },
};

