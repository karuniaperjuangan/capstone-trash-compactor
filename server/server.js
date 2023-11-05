import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import InitializeMongoServer from './config/db.js';
import user from './routes/user.js';
import device from './routes/device.js';
import record from './routes/record.js';
InitializeMongoServer();

const app = express()
const port = process.env.PORT || 3000
console.log(process.env.MONGO_URI);
// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/user", user);
app.use("/device", device);
app.use("/record", record);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})