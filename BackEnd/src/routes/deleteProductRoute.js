

import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';

export const deleteProductRoute = {
    path: '/api/products/:productId',
    method: 'delete',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { productId } = req.params;
        console.log('Product ID:', productId);

        // Check if the authorization header exists
        if (!authorization) {
            return res.status(401).json({ message: 'No authorization header found' });
        }

        // Extract the token from the header
        const token = authorization.split(' ')[1];
        
        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.error('JWT Error:', err.message);  // Log the error message for debugging
                return res.status(401).json({ message: 'Invalid or expired token' });
            }

            // Validate productId format
            if (!ObjectId.isValid(productId)) {
                return res.status(400).json({ message: 'Invalid product ID' });
            }

            try {
                // Connect to the database
                const db = getDbConnection('crm');

                // Delete the product from the database
                const result = await db.collection('products').findOneAndDelete({
                    _id: new ObjectId(productId),
                });

                if (!result.value) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                return res.status(200).json({ message: 'Product deleted successfully' });
            } catch (error) {
                console.error('Error deleting product:', error.message);  // Log the error message for debugging
                return res.status(500).json({ message: 'Failed to delete product' });
            }
        });
    },
};
