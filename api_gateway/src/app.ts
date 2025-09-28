
import express, { Response, Request, NextFunction, urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import proxy from "express-http-proxy";
import { validateToken } from "./middleware/validateToken";

const app = express();
app.use(express.json({limit:'50mb'}));
app.use(urlencoded({ extended: true ,limit:'50mb'}));
app.disable("x-powered-by");
const PORT = Number(process.env.PORT) || 4000;

const auth_service = process.env.AUTH_SERVICE || "localhost:4001"
const music_service = process.env.BLOG_SERVICE || "localhost:4002"
const media_service = process.env.MEDIA_SERVICE || "localhost:4003"





app.use( (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(`Received ${req.method} request to ${req.url}`);
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    next();
  } catch (error) {
    console.error("Middleware error:", error);
    next(error);
  }
});

const proxyOption = {
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err: Error, res: Response, next: NextFunction) => {
    console.log(err);
    console.error(`Proxy error:${err.message}`);
    res.status(500).json({
      message: `Internal server error`,
      error: err.message,
    });
  },
};




// for authentication

app.use('/v1/auth',proxy(`http://${auth_service}/api/auth`,{
    ...proxyOption,
    proxyReqOptDecorator:(proxyReq,srcReq)=>{
        proxyReq.headers["Content-Type"] = "application/json";
      return proxyReq;
    },
    userResDecorator:(proxyRes, proxyResData, userReq, userRes)=>{
       console.log(
        "Response Recieved from Identity service : ",
        proxyRes.statusCode
      );
      return proxyResData;
    }
}))

// for music service
app.use('/v1/song',validateToken,proxy(`http://${music_service}/api/auth`,{
    ...proxyOption,
    limit:'10mb',
    proxyReqOptDecorator:(proxyReq,srcReq)=>{
        proxyReq.headers["x-user-id"] = srcReq.app.locals.conUser.id
      //     if (!srcReq.headers["content-type"].startsWith("multipart/form-data")) {
      //   proxyReq.headers["Content-Type"] = "application/json";
      // }
      return proxyReq;
    },
    userResDecorator:(proxyRes, proxyResData, userReq, userRes)=>{
       console.log(
        "Response Recieved from music service : ",
        proxyRes.statusCode
      );
      return proxyResData;
    }
}))

app.listen(PORT, () => {
  console.log(`api_gateway is running on ${PORT}`);
});
