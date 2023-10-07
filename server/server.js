import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import InitializeMongoServer from './config/db.js';
import user from './routes/user.js';

InitializeMongoServer();

const app = express()
const port = process.env.PORT || 3000
console.log(process.env.MONGO_URI);
// Middleware
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/user", user);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})