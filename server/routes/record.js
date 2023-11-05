import Device from "../model/Device.js";
import Record from "../model/Record.js";
import express from "express";
const router = express.Router();

router.post("/add", async (req, res) => {
    const {
        deviceID,
        height
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
        const record = new Record({
            deviceID,
            height
        });

        await record.save();

        res.status(200).json({
            msg: "Record Added Successfully",
            deviceID: deviceID,
            height: height
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving: " + err.message);
    }
});

router.post("/delete", async (req, res) => {
    
});
export default router;