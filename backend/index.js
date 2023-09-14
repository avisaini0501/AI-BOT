import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import apiRoute from "./routes/api.js";


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
};


app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/bardApi", apiRoute)


app.listen(port, ()=> {
    console.log("server listening on port", port);
});