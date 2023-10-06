import mongoose from 'mongoose';

const RecordSchema = new mongoose.Schema({
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