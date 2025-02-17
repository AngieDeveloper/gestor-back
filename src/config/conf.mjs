import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    MONGO_URI: process.env.MONGO_URI,
};
