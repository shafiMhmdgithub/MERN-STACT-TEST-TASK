
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/products'); // Save files to this directory
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

// Middleware for handling file uploads
const upload = multer({ storage });

export const productRoute = {
    path: '/api/product',
    method: 'post',
    handler: [
        upload.single('productImage'),
        async (req, res) => {
            try {
                const { title, description, category, price, stock, brand, section, status } = req.body;

                if (!req.file) {
                    return res.status(400).json({ message: 'No file uploaded.' });
                }

                const image = req.file.filename;
                console.log('Uploaded file path:', image);

                const db = getDbConnection('crm');
                const result = await db.collection('products').insertOne({
                    title,
                    image,
                    description,
                    category,
                    price,
                    stock,
                    brand,
                    section,
                    status,
                });

                const { insertedId } = result;

                jwt.sign(
                    { id: insertedId, title, description, category, price, stock, brand, section, status },
                    process.env.JWT_SECRET,
                    { expiresIn: '2d' },
                    (err, token) => {
                        if (err) {
                            return res.status(500).json({ error: err.message });
                        }
                        res.status(200).json({ token });
                    }
                );
            } catch (error) {
                console.error('Error in product upload:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        },
    ],
};
