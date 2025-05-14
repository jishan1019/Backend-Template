import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
//import rateLimit from "express-rate-limit";


const app = express();

//parset
app.use(express.json());
app.use(cookieParser());
app.use(express.text());
app.use(cors());

// const limiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 20, // allow 100 requests per minute
//   message: "Too many requests from this IP, please try again later.",
//   standardHeaders: true,
//   legacyHeaders: false,
//   keyGenerator: (req: any) => {
//     const ip = req.ip || req.connection.remoteAddress || "unknown-ip";
//     const userAgent = req.headers["user-agent"] || "unknown-agent";
//     const deviceKey = `${ip}-${userAgent}`;

//     // console.log({ deviceKey });

//     return deviceKey;
//   },
// });


// app.use(limiter);


//Application Routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Running!");
});

//global error handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
