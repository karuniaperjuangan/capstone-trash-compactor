import mongoose from 'mongoose';

const DeviceUserSchema = new mongoose.Schema({
    PairID: {
        type: String,
        required: true,
        unique: true,
    },
    deviceID: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("deviceuser", DeviceUserSchema);