import { getDbConnection } from "../db";

export const getAllProductsRoute = {
    path: '/api/get-products',
    method: 'get',
    handler: async (req, res) => {
        try {
            const db = getDbConnection('crm');
            const collection = db.collection('products'); // Correct method to access the collection
            
            // Fetch all products
            const products = await collection.find({}).toArray(); // Convert cursor to array
            
            if (products.length === 0) {
                return res.status(200).json({ message: 'No products found' }); // Inform that there are no products
            }
            
            res.status(200).json(products); // Return the list of products
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};
