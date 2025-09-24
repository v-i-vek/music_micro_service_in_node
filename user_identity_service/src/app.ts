import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
dotenv.config()


import {connectDB} from './config/db';
import router from './routes/user.route';

const app = express();
app.use(express.json())
app.use(urlencoded({extended:true}))
const port = 4000;

connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(router)
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});