import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  dbUrl: process.env.MONGODB_URL,
  jwt: process.env.JWT_SECRET,
};

export default config;
