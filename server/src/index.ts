import express from "express";
import routers from "./routes/index.routes";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import config from "./config";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many requests",
});

app.use(helmet);
app.use(limiter);
app.use(routers);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
