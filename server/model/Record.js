import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
    RecordID: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    deviceID: {
        type: String,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("record", RecordSchema);