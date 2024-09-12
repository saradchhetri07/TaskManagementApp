import express from "express";
import routers from "./routes/index.routes";
import rateLimiter from "express-rate-limit";
import config from "./config";
import cors from "cors";
import { genericErrorHandler } from "./middlewares/errorHandler.middlewares";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "hello world",
  });
});

app.use(cors());
app.use(express.json());
app.use(routers);

app.use(genericErrorHandler);
