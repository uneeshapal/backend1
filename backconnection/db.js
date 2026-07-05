import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

mongoose.connect(process.env.ATLASURL)
.then(() => {
    console.log("Connected");
    console.log("Database Name:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
});