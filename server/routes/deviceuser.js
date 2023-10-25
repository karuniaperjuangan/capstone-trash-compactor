import express from "express";
import DeviceUser from "../model/DeviceUser.js";
import Device from "../model/Device.js";
import User from "../model/User.js";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

/**
 * @method - POST
 * @param - /add
 * @description - Add Device-User Pair
 */

router.post("/add", async (req, res) => {
    const {
        deviceID,
        username
    } = req.body;
    try {
        const device = await Device.findOne({
            deviceID
        });
        if (!device) {
            return res.status(400).json({
                msg: "Device Not Exists"
            });
        }
        const user = await User.findOne({
            username
        });
        if (!user) {
            return res.status(400).json({
                msg: "User Not Exists"
            });
        }
        const deviceuser = new DeviceUser({
            deviceID,
            username
        });

        await deviceuser.save();
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
});