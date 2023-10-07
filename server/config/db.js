import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config("../.env");

console.log(process.env.MONGO_URI);
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/db_capstone';

export default async function InitializeMongoServer(){
    try {
        await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true
        });
        console.log('Connected to DB !!');
    } catch (e) {
        console.log(e);
        throw e;
    }
}