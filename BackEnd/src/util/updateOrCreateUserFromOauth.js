
import { getDbConnection } from '../db';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {
    try {
        const { id: googleId, verified_email: isVerified, email } = oauthUserInfo;

        if (!googleId || !email) {
            throw new Error('Missing required OAuth user info');
        }

        const db = getDbConnection('crm');
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            const result = await db.collection('users').findOneAndUpdate(
                { email },
                { $set: { googleId, isVerified } },
                { returnOriginal: false }
            );
            return result.value;
        } else {
            const result = await db.collection('users').insertOne({
                email,
                googleId,
                isVerified,
                info: {},
            });

            // Return the newly created user
            return await db.collection('users').findOne({ _id: result.insertedId });
        }
    } catch (error) {
        console.error('Error updating or creating user:', error);
        throw new Error('Failed to update or create user');
    }
};
