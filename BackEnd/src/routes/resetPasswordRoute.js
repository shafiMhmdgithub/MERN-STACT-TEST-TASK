

// import bcrypt from 'bcrypt';
// import { getDbConnection } from '../db';

// export const resetPasswordRoute = {
//     path: '/api/users/:passwordResetCode/reset-password',
//     method: 'put',
//     handler: async (req, res) => {
//         const { passwordResetCode } = req.params; // Get the reset code from the URL
//         const { password } = req.body; // Get the new password from the body

//         console.log("Password reset code received:", passwordResetCode);
//         console.log("Password we got from reset page:", password);

//         const db = getDbConnection('crm');
//         const newPasswordHash = await bcrypt.hash(password, 10); // Hash the new password

//         try {
//             // Attempt to find the user and update the password
//             const result = await db.collection('users')
//                 .findOneAndUpdate(
//                     { passwordResetCode },  // Find user by reset code
//                     { 
//                         $set: { passwordHash: newPasswordHash },  // Set the new password hash
//                         $unset: { passwordResetCode: '' }  // Remove the reset code after use
//                     },
//                     { returnDocument: 'after', upsert: false } // Ensure it doesn't insert a new user if not found
//                 );

//             console.log("Result from findOneAndUpdate:", result);

//             if (!result.value) {
//                 console.log("No document matched or reset code invalid");
//                 return res.status(404).json({ message: "Invalid or expired reset code" });
//             }

//             // Send response after successful update
//             res.sendStatus(200); // Password successfully reset
//         } catch (error) {
//             console.log("Error during password reset:", error);
//             res.sendStatus(500); // Internal server error
//         }
//     },
// };
import bcrypt from 'bcrypt';
import { getDbConnection } from '../db';

export const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { passwordResetCode } = req.params; // Get the reset code from the URL
        const { password } = req.body; // Get the new password from the body

        console.log("Password reset code received:", passwordResetCode);
        console.log("Password we got from reset page:", password);

        const db = getDbConnection('crm');
        const newPasswordHash = await bcrypt.hash(password, 10); // Hash the new password

        try {
            // First check if a user with the reset code exists
            const existingUser = await db.collection('users').findOne({ passwordResetCode });
            console.log("Matching user:", existingUser);

            if (!existingUser) {
                return res.status(404).json({ message: "Invalid or expired reset code" });
            }

            // Perform the update
            const updateResult = await db.collection('users').updateOne(
                { passwordResetCode }, // Match user by reset code
                { 
                    $set: { passwordHash: newPasswordHash },  // Update the password hash
                    $unset: { passwordResetCode: '' }  // Remove the reset code after use
                }
            );

            console.log("Update result:", updateResult);

            if (updateResult.matchedCount === 0) {
                return res.status(404).json({ message: "Failed to update password" });
            }

            res.sendStatus(200); // Password successfully reset
        } catch (error) {
            console.log("Error during password reset:", error);
            res.sendStatus(500); // Internal server error
        }
    },
};
