import express from "express";
import routers from "./routes/index.routes";
import config from "./config";

const app = express();
app.use(routers);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
