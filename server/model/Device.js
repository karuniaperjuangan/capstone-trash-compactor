import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema({
    deviceID: {
        type: String,
        required: true,
        unique: true,
    },
    deviceName:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("device", DeviceSchema);