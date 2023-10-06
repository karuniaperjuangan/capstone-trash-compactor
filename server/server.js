import express from 'express';
import bodyParser from 'body-parser';
import InitializeMongoServer from './config/db.js';
import { config } from 'dotenv';
import user from './routes/user.js';
config();

InitializeMongoServer();

const app = express()
const port = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use("/user", user);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})