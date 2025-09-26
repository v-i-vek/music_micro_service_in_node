import express, { urlencoded } from 'express';
import dotenv from 'dotenv'
dotenv.config()

import { connectDB } from './config/db';
import router from './routes/song.route';
import { successValidator } from './middleware/success.middleware';
import { errorHandler, errorLogger } from './middleware/error.middleware';
import { authenticateReq } from './middleware/auth.middleware';






const app = express();
app.use(express.json({limit:'50mb'}))
app.use(urlencoded({extended:true}))
app.disable("x-powered-by")
const PORT = process.env.PORT||4002;

//DB connection
connectDB()

app.use((req,res,next)=>{
  console.log(req.path)
  console.log(req.originalUrl)
  next()
})

app.use('/api/song',authenticateReq,router,successValidator)
app.use(errorHandler)
app.use(errorLogger)

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});



