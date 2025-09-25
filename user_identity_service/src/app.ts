import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
dotenv.config()


import {connectDB} from './config/db';
import { errorHandler,errorLogger } from './middleware/error.middleware';
import router from './routes/user.route';
import { successValidator } from './middleware/success.middleware';

const app = express();
app.use(express.json())
app.use(urlencoded({extended:true}))
app.disable("x-powered-by")
const port = 4000;

connectDB()

app.use(router,successValidator)
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(errorHandler)
app.use(errorLogger)
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});