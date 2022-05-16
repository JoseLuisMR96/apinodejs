import mongoose from "mongoose";
import config from "./config";

(async () => {
    try {
        const db = await mongoose.connect(config.mongodburl);
        console.log('Conectado a la base de datos:', db.connection.name);
    } catch (error) {
        console.error(error);
    }
})(); 
