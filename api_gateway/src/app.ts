
import express, { Response, Request, NextFunction, urlencoded } from "express";
import dotenv from "dotenv";
dotenv.config();
import proxy from "express-http-proxy";
import { validateToken } from "./middleware/validateToken";

const app = express();

// DO NOT USE GLOBAL BODY PARSERS
// app.use(express.json({limit:'50mb'}));
// app.use(urlencoded({ extended: true ,limit:'50mb'}));

app.disable("x-powered-by");
const PORT = Number(process.env.PORT) || 4000;

const auth_service = process.env.AUTH_SERVICE || "localhost:4001";
const music_service = process.env.MUSIC_SERVICE || "localhost:4002"; // Corrected env variable name
const playlist_service = process.env.MEDIA_SERVICE || "localhost:4003";

// Create a reusable JSON parser
const jsonParser = express.json({ limit: '50mb' });

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  // Don't log the body here, as it can interfere with streams.
  // Only log bodies inside routes that have parsed them.
  next();
});

const proxyOption = {
  proxyReqPathResolver: (req: Request) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHandler: (err: Error, res: Response, next: NextFunction) => {
    console.error(`Proxy error: ${err.message}`);
    res.status(500).json({ message: `Internal server error`, error: err.message });
  },
};

// --- AUTHENTICATION PROXY (Needs JSON Parser) ---
app.use('/v1/auth', jsonParser, proxy(`http://${auth_service}/api/auth`, {
    ...proxyOption,
    proxyReqOptDecorator:(proxyReq, srcReq)=>{
        proxyReq.headers["Content-Type"] = "application/json";
        return proxyReq;
    },
    userResDecorator:(proxyRes, proxyResData, userReq, userRes)=>{
       console.log("Response from Identity service: ", proxyRes.statusCode);
       return proxyResData;
    }
}));

// --- MUSIC SERVICE PROXY (Handles File Uploads - NO JSON Parser) ---
app.use('/v1/song', validateToken, proxy(`http://${music_service}/api/song`, {
    ...proxyOption,
    limit: '50mb', // Limit for the proxied request
    proxyReqOptDecorator:(proxyReq, srcReq)=>{
        proxyReq.headers["x-user-id"] = srcReq.app.locals.conUser.id;
        // Let the original 'Content-Type: multipart/form-data' pass through
        return proxyReq;
    },
    userResDecorator:(proxyRes, proxyResData, userReq, userRes)=>{
       console.log("Response from Music service: ", proxyRes.statusCode);
       return proxyResData;
    }
}));

app.use('/v1/playlist', validateToken, proxy(`http://${playlist_service}/api/playlist`, {
    ...proxyOption,
    limit: '50mb', // Limit for the proxied request
    proxyReqOptDecorator:(proxyReq, srcReq)=>{
        proxyReq.headers["x-user-id"] = srcReq.app.locals.conUser.id;
        // Let the original 'Content-Type: multipart/form-data' pass through
        return proxyReq;
    },
    userResDecorator:(proxyRes, proxyResData, userReq, userRes)=>{
       console.log("Response from Music service: ", proxyRes.statusCode);
       return proxyResData;
    }
}));

app.listen(PORT, () => {
  console.log(`API Gateway is running on ${PORT}`);
});