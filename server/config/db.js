import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/db_capstone';

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