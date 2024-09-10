import express from "express";
import routers from "./routes/index.routes";
import rateLimiter from "express-rate-limit";
import config from "./config";
import { genericErrorHandler } from "./middlewares/errorHandler.middlewares";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many requests",
});

app.use(express.json());
app.use(routers);

app.use(genericErrorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
