import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  PORT: process.env.PORT,
};

export default config;
