import express from "express";
import Device from "../model/Device.js";
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

/**
 * @method - POST
 * @param - /add
 * @description - Add Device
 */

router.post("/add", async (req, res) => {
    const {
        deviceName,
        devicePassword
    } = req.body;
    try {
        let deviceID = uuidv4();

        while(true){
        let device = await Device.findOne({
            deviceID
        });
        if (device) {
            deviceID = uuidv4();
            continue;
        }
        break;
        }
       

        const device = new Device({
            deviceID,
            deviceName,
            devicePassword
        });

        await device.save();


        res.status(200).json({
            msg: "Device Added Successfully",
            deviceID: deviceID,
            deviceName: deviceName
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
});

export default router;