import mongoose from "mongoose";

import 'dotenv/config';

export async function connectDB() {

    await mongoose.connect(
        String(process.env.MONGO_URL),
        {
            dbName: 'carcompare'
        })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
}