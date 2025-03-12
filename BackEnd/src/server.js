
import express from 'express';
import { routes } from './routes';
import cors from 'cors';
import { initializeDbConnection } from './db';
import dotenv from 'dotenv';
import path from 'path';  // This is how you import path in ES6 (ES modules)
import paypal from 'paypal-rest-sdk';
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use('/uploads', cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET'], // Allow only GET for images
    credentials: true, // Allow credentials if needed
}));




// CORS setup (simplified)
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials if needed
}));

//paypal

paypal.configure({
    'mode': 'sandbox', // or 'live' for production
    'client_id': process.env.PAYPAL_CLIENT_ID, // Use the client ID from the .env file
    'client_secret': process.env.PAYPAL_CLIENT_SECRET // Use the client secret from the .env file
  });

// Middleware
app.use(express.json()); // Parse JSON body


// Serve files from the 'public' directory (where 'uploads' is located)
app.use('/uploads', express.static('public/uploads'));
// Routes
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

// Database connection and server start
initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });

