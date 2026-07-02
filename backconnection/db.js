import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();
const db = process.env.ATLASURL;

const abc = mongoose.connect(db).then(() => {
    console.log("connected to db");
});

export default abc; 